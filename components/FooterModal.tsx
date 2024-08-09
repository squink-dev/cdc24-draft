"use client";

import { useState } from "react";
import PlayerList from "./PlayerList";
import TeamList from "./TeamList";
import {
  User,
  Player,
  Captain,
  Team,
  PickedPlayer,
} from "@/interfaces/interfaces";

interface FooterModalProps {
  players: Player[];
  teams: Team[];
  pickedPlayers: PickedPlayer[];
}

export default function FooterModal({
  players,
  teams,
  pickedPlayers,
}: FooterModalProps) {
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
          id="screen"
          onClick={handleOverlayClick}
          className={`fixed inset-0 bg-black bg-opacity-80 z-50 flex items-end justify-center ${
            isAnimating ? "fade-in" : "fade-out"
          }`}
        >
          <div
            id="playerlistfooterBG"
            className={`bg-cdc-lightgrey p-8 w-[90%] h-[68%] rounded-t-sm relative shadow-lg ${
              isAnimating ? "slide-up" : "slide-down"
            }`}
          >
            <PlayerList players={players} />
          </div>
        </div>
      )}

      {/* Team List Modal */}
      {isTeamModalOpen && (
        <div
          id="screen"
          onClick={handleOverlayClick}
          className={`fixed inset-0 bg-black bg-opacity-80 z-50 flex items-end justify-center ${
            isAnimating ? "fade-in" : "fade-out"
          }`}
        >
          <div
            id="teamlistfooterBG"
            className={`bg-cdc-lightgrey p-8 w-[90%] h-[90%] rounded-t-sm relative shadow-lg ${
              isAnimating ? "slide-up" : "slide-down"
            }`}
          >
            <TeamList teams={teams} />
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
