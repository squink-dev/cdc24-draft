"use client";

import { useState } from "react";

export default function FooterModal() {
  const [isPlayerModalOpen, setPlayerModalOpen] = useState(false);
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

  const openPlayerModal = () => {
    setPlayerModalOpen(true);
    setAnimating(true);
  };

  const closePlayerModal = () => {
    setAnimating(false);
    setTimeout(() => setPlayerModalOpen(false), 300); // Match animation duration
  };

  const openTeamModal = () => {
    setTeamModalOpen(true);
    setAnimating(true);
  };

  const closeTeamModal = () => {
    setAnimating(false);
    setTimeout(() => setTeamModalOpen(false), 300); // Match animation duration
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      if (isPlayerModalOpen) {
        closePlayerModal();
      } else if (isTeamModalOpen) {
        closeTeamModal();
      }
    }
  };

  return (
    <div className="relative">
      {/* Footer Buttons */}
      <div id="footer">
        <div className="flex p-4">
          <button
            onClick={openPlayerModal}
            className="bg-cdc-grey border-4 border-cdc-darkgrey text-cdc-lightgrey uppercase w-1/2 h-10 m-2 text-2xl"
          >
            <div className="-translate-y-0.5">Player List</div>
          </button>
          <button
            onClick={openTeamModal}
            className="bg-cdc-grey border-4 border-cdc-darkgrey text-cdc-lightgrey uppercase w-1/2 h-10 m-2 text-2xl"
          >
            <div className="-translate-y-0.5">Team List</div>
          </button>
        </div>
      </div>

      {/* Player List Modal */}
      {isPlayerModalOpen && (
        <div
          onClick={handleOverlayClick}
          className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-end justify-center ${
            isAnimating ? "fade-in" : "fade-out"
          }`}
        >
          <div
            className={`bg-white p-8 w-[90%] h-[68%] rounded-t-md relative shadow-lg ${
              isAnimating ? "slide-up" : "slide-down"
            }`}
          >
            <h1 className="text-xl font-bold mb-4">Full Player List</h1>
            {/* player list content here */}
          </div>
        </div>
      )}

      {/* Team List Modal */}
      {isTeamModalOpen && (
        <div
          onClick={handleOverlayClick}
          className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-end justify-center ${
            isAnimating ? "fade-in" : "fade-out"
          }`}
        >
          <div
            className={`bg-white p-8 w-[90%] h-[68%] rounded-t-md relative shadow-lg ${
              isAnimating ? "slide-up" : "slide-down"
            }`}
          >
            <h1 className="text-xl font-bold mb-4">Full Team List</h1>
            {/* team list content here */}
          </div>
        </div>
      )}

      <style jsx>{`
        .slide-up {
          animation: slide-up 0.25s ease-out forwards;
        }

        .slide-down {
          animation: slide-down 0.25s ease-out forwards;
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }

        .fade-in {
          animation: fade-in 0.25s forwards;
        }

        .fade-out {
          animation: fade-out 0.25s forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
