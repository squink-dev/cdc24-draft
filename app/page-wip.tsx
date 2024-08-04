"use client";

import { useEffect, useState } from "react";
import FooterModal from "@/components/FooterModal";
import SearchBox from "@/components/SearchBox";
import DraftedModal from "@/components/DraftedModal";
import PlayerCard from "@/components/PlayerCard";
import playerData from "@/public/playerData.json";

const fetchPlayerDetails = async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  return data;
};

const fetchData = async () => {
  const { players, captains } = playerData;
  const playerDetails = await Promise.all(
    players.map((p) => fetchPlayerDetails(p.user_id))
  );
  const captainDetails = await Promise.all(
    captains.map((c) => fetchPlayerDetails(c.user_id))
  );

  const enrichedPlayers = players.map((p, index) => ({
    ...p,
    ...playerDetails[index],
  }));

  const enrichedCaptains = captains.map((c, index) => ({
    ...c,
    ...captainDetails[index],
  }));

  const teams = enrichedCaptains.map((captain, index) => ({
    captain,
    players: [],
  }));

  return { teams, players: enrichedPlayers };
};

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPick, setCurrentPick] = useState(0);
  const [pickedPlayers, setPickedPlayers] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      const { teams, players } = await fetchData();
      console.log(teams, players);
      setTeams(teams);
      setPlayers(players);
    };
    initializeData();
  }, []);

  const currentTeamIndex = currentPick % 8;
  const isReverse = Math.floor(currentPick / 8) % 2 === 1;
  const actualTeamIndex = isReverse ? 7 - currentTeamIndex : currentTeamIndex;
  const currentTeam = teams[actualTeamIndex];

  const handlePlayerSelect = (player) => {
    const updatedTeams = [...teams];
    updatedTeams[actualTeamIndex].players.push(player);
    setTeams(updatedTeams);
    setPickedPlayers([...pickedPlayers, player]);
    setPlayers(players.filter((p) => p.user_id !== player.user_id));
    setCurrentPick(currentPick + 1);
  };

  const handleUndo = () => {
    if (currentPick > 0) {
      const lastPick = pickedPlayers[pickedPlayers.length - 1];
      const updatedTeams = [...teams];
      updatedTeams[actualTeamIndex].players.pop();
      setTeams(updatedTeams);
      setPickedPlayers(pickedPlayers.slice(0, -1));
      setPlayers([...players, lastPick]);
      setCurrentPick(currentPick - 1);
    }
  };

  const handleRedo = () => {
    // Implement if needed
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div id="top">
        <div className="columns-3 gap-4">
          <div className="text-cdc-darkred text-3xl text-right">
            Last Pick: {pickedPlayers[pickedPlayers.length - 1]?.name}
          </div>
          <div className="pt-2 pb-2 text-white text-3xl text-center mix-blend-difference">
            Currently Picking: {currentTeam.captain}
          </div>
          <div className="text-cdc-darkred text-3xl text-left">
            Next Pick: {teams[(actualTeamIndex + 1) % 8].captain}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* First Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Already Picked Teams */}
          {/* TODO: Add column header */}
          <div className="flex space-x-4 ">
            {teams.slice(0, 2).map((team, index) => (
              <div
                key={index}
                className="flex-1 bg-gray-200 p-4 h-[430px] border-2 border-cdc-darkgrey"
              >
                {/* Display team players */}
                {team.players.map((player, i) => (
                  <PlayerCard key={i} player={player} />
                ))}
              </div>
            ))}
          </div>
          <div className="border-2 border-cdc-darkgrey">
            <SearchBox onSelect={handlePlayerSelect} players={players} />
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Large Team Box */}
          <div className="flex-grow bg-cdc-darkgrey p-4 pt-10 text-2xl text-white">
            <div id="bolsterBold">
              <div className="-translate-y-8">
                <text>Team {currentTeam.captain}</text>
              </div>
            </div>
          </div>
          {/* Buttons Area */}
          <div className="justify-center items-center flex space-x-4">
            <button
              onClick={handleUndo}
              className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow"
            >
              {/* Undo Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handleRedo}
              className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow"
            >
              {/* Redo Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPick(currentPick + 1)}
              className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow"
            >
              {/* Next Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Upcoming Teams */}
          {/* TODO: Add column header */}
          <div className="flex space-x-4">
            {teams.slice(2, 4).map((team, index) => (
              <div
                key={index}
                className="flex-1 bg-gray-200 p-4 h-[430px] border-2 border-cdc-darkgrey"
              >
                {/* Display team players */}
                {team.players.map((player, i) => (
                  <PlayerCard key={i} player={player} />
                ))}
              </div>
            ))}
          </div>
          {/* Discord Captain Chat */}
          <div className="flex-grow bg-green-screen p-4 border-2 border-cdc-darkgrey"></div>
        </div>
      </div>

      <FooterModal />
    </main>
  );
}
