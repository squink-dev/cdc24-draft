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

  return (
    <div className="relative">
      {/* Footer Buttons */}
      <div className="flex bg-gray-800 p-4">
        <button
          onClick={openPlayerModal}
          className="bg-green-500 text-white py-2 w-1/2 m-2"
        >
          Open Full Player List
        </button>
        <button
          onClick={openTeamModal}
          className="bg-green-500 text-white py-2 w-1/2 m-2"
        >
          Open Full Team List
        </button>
      </div>

      {/* Player List Modal */}
      {isPlayerModalOpen && (
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 ${isAnimating ? "slide-up" : "slide-down"}`}
        >
          <div className="bg-white p-8 w-full h-full">
            <button onClick={closePlayerModal} className="text-red-500">
              Close Player List
            </button>
            <h1>Full Player List</h1>
            {/* Add your player list content here */}
          </div>
        </div>
      )}

      {/* Team List Modal */}
      {isTeamModalOpen && (
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 ${isAnimating ? "slide-up" : "slide-down"}`}
        >
          <div className="bg-white p-8 w-full h-full">
            <button onClick={closeTeamModal} className="text-red-500">
              Close Team List
            </button>
            <h1>Full Team List</h1>
            {/* Add your team list content here */}
          </div>
        </div>
      )}

      <style jsx>{`
        .slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }

        .slide-down {
          animation: slide-down 0.3s ease-out forwards;
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
      `}</style>
    </div>
  );
}
