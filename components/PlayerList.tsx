/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Player } from "@/interfaces/interfaces";

interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="grid grid-cols-5 gap-0 overflow-y-auto h-[670px]">
      {players.map((player, index) => (
        <div
          key={index}
          className="flex items-center p-4 border border-gray-300"
        >
          <img
            src={player.avatar_url}
            alt={`${player.username}'s avatar`}
            className="w-10 h-10 mr-3"
          />
          <div className="flex-grow">
            <div className="">{player.username}</div>
          </div>
          <div className="text-gray-600 text-lg">
            {"#" + player.bws_rank.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
