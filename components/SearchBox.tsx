"use client";

import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import { User } from "@/interfaces/interfaces";
import DraftedModal from "./DraftedModal";

export default function SearchBox() {
  const [players, setPlayers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<User | null>(null);

  useEffect(() => {
    fetch("/playerData.json")
      .then((response) => response.json())
      .then((data) => {
        const fetchPlayerDetails = async () => {
          const playerDetails = await Promise.all(
            data.players.map(
              async (player: { user_id: string; about: string }) => {
                const response = await fetch(`/api/user/${player.user_id}`);
                const userData = await response.json();
                return {
                  user_id: player.user_id,
                  username: userData.username,
                  avatar_url: userData.avatar_url,
                  bws_rank: userData.bws_rank,
                  about: player.about,
                };
              }
            )
          );
          setPlayers(playerDetails);
        };

        fetchPlayerDetails();
      });
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[460px] bg-gray-200 p-4 overflow-y-auto">
      <input
        type="text"
        placeholder="Search"
        className="mb-2 p-2 border border-gray-300"
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
            onClick={() => setSelectedPlayer(player)}
          />
        ))}
      </div>
      {selectedPlayer && (
        <DraftedModal
          user={selectedPlayer}
          about="{TEMP TEXT}: In the northern chill, I stand, Captain’s band upon my hand. Canadian Draft Cup calls my name, Yet I feel a quiet shame.  Leadership's a heavy crown, I'd rather lay this burden down. Let another guide the way, In the game, let others sway.  The honor's grand, the stakes are high, But in my heart, a simple sigh. To step aside, to find my peace, Let my spirit find release.  Underneath the northern sky, I'll watch the game and wonder why. For now, I choose the quiet stream, And let another chase the dream.  Alas, I wish a simple life. One where my chance of captain is low and my spirits high."
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}
