/* eslint-disable @next/next/no-img-element */

import {
  User,
  Player,
  Captain,
  Team,
  PickedPlayer,
} from "@/interfaces/interfaces";
import PlayerCard from "./PlayerCard";

interface TeamListProps {
  teams: Team[];
}

export default function TeamList({ teams }: TeamListProps) {
  return (
    <div className="grid grid-cols-4 gap-4 overflow-y-auto no-scrollbar h-[900px]">
      {teams.map((team, index) => (
        <div
          key={index}
          className="border-2 border-cdc-darkgrey p-4 bg-gray-200 min-h-[430px]"
          id="teamlistBG"
        >
          <div id="rubik" className="flex flex-col">
            <PlayerCard
              username={team.captain.username}
              avatar_url={team.captain.avatar_url}
              bws_rank={team.captain.bws_rank}
            />
            {team.players.map((player, i) => (
              <PlayerCard
                key={i}
                username={player.username}
                avatar_url={player.avatar_url}
                bws_rank={player.bws_rank}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
