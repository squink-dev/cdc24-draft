"use client";

import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import DraftedModal from "./DraftedModal";
import {
  User,
  Player,
  Captain,
  Team,
  PickedPlayer,
} from "@/interfaces/interfaces";

interface SearchBoxProps {
  players: Player[];
  onClick?: (player: Player) => void;
}

export default function SearchBox({ players, onClick }: SearchBoxProps) {
  const [searchInput, setSearchInput] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div id="searchBox" className="flex flex-col h-[458px] bg-gray-200 p-6">
      <div className="flex flex-col h-[458px] p-6 overflow-y-scroll scroll-p-4 no-scrollbar">
        <input
          type="text"
          placeholder="Search"
          className="mb-2 p-2 border text-black border-gray-300"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="flex-grow">
          {filteredPlayers.map((player, index) => (
            <PlayerCard
              key={index}
              username={player.username}
              avatar_url={player.avatar_url}
              bws_rank={player.bws_rank}
              isDark={true}
              onClick={onClick ? () => onClick(player) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
