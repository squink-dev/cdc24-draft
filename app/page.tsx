"use client";

import { useEffect, useState } from "react";
import FooterModal from "@/components/FooterModal";
import SearchBox from "@/components/SearchBox";
import playerData from "@/public/playerData.json";
import {
  User,
  Player,
  Captain,
  Team,
  PickedPlayer,
} from "@/interfaces/interfaces";
import DraftedModal from "@/components/DraftedModal";
import CurrentPlayerCard from "@/components/CurrentPlayerCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/toastify.css";
import PlayerCard from "@/components/PlayerCard";

const fetchPlayerDetails = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  return data;
};

const fetchData = async (): Promise<{ teams: Team[]; players: Player[] }> => {
  const { players, captains } = playerData;
  const playerDetails = await Promise.all(
    players.map((p) => fetchPlayerDetails(p.user_id))
  );
  const captainDetails = await Promise.all(
    captains.map((c) => fetchPlayerDetails(c.user_id))
  );

  const enrichedPlayers: Player[] = players.map((p, index) => ({
    ...p,
    ...playerDetails[index],
  }));

  const enrichedCaptains: Captain[] = captains.map((c, index) => ({
    ...c,
    ...captainDetails[index],
  }));

  const teams: Team[] = enrichedCaptains.map((captain) => ({
    captain,
    players: [],
  }));

  return { teams, players: enrichedPlayers };
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [pickedPlayers, setPickedPlayers] = useState<PickedPlayer[]>([]);

  const [currentRound, setCurrentRound] = useState(0); // 0 - 7 snaking
  const [currentTeam, setCurrentTeam] = useState(0); // 0 - 7
  const [currentPick, setCurrentPick] = useState(0); // current pick (pointer for pickedPlayers + round/team state)
  const [prevTeams, setPrevTeams] = useState<number[]>([]);
  const [nextTeams, setNextTeams] = useState<number[]>([1, 2]);

  const snakeOrder = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];

  const isReverse = currentRound % 2 === 1;

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      const { teams, players } = await fetchData();
      console.log(teams, players);
      setTeams(teams);
      setPlayers(players);
      setLoading(false);
    };
    initializeData();
  }, []);

  console.log("isReverse", isReverse);
  console.log("Round: ", currentRound);
  console.log("Team: ", currentTeam);
  console.log("Current Pick: ", currentPick);

  const handlePlayerSelect = (player: Player) => {
    if (
      currentTeam === 7 &&
      !isReverse &&
      pickedPlayers.length - 1 === currentPick
    ) {
      handleNextPick();
    } else if (
      currentTeam === 0 &&
      isReverse &&
      pickedPlayers.length - 1 === currentPick
    ) {
      handleNextPick();
    } else if (currentRound + 1 <= teams[currentTeam].players.length) {
      toast.error(
        teams[currentTeam].captain.username_clean + " already picked"
      );
      return;
    }

    navigator.clipboard.writeText(player.user_id.toString());

    setSelectedPlayer(player);
    // Update team with selected player
    const updatedTeams = [...teams]; // shallow copy
    updatedTeams[currentTeam].players.push(player);
    setTeams(updatedTeams);

    // Add player to picked players & remove from available players
    const originalIndex = players.findIndex(
      (p) => p.user_id === player.user_id
    );
    setPickedPlayers([...pickedPlayers, { player, originalIndex }]);
    setPlayers(players.filter((p) => p.user_id !== player.user_id));
  };

  const handleUndoPick = () => {
    if (pickedPlayers.length > 0 && pickedPlayers.length - 1 === currentPick) {
      setSelectedPlayer(null);

      // Remove player from team
      const { player, originalIndex } = pickedPlayers[pickedPlayers.length - 1];
      const updatedTeams = [...teams];
      updatedTeams[currentTeam].players = updatedTeams[
        currentTeam
      ].players.filter((p) => p.user_id !== player.user_id);
      setTeams(updatedTeams);

      // Remove player from picked players & add back to available players
      setPickedPlayers(pickedPlayers.slice(0, -1));
      const updatedPlayers = [...players];
      updatedPlayers.splice(originalIndex, 0, player);
      setPlayers(updatedPlayers);
    }
  };

  const updateNextTeams = (isPrev: boolean) => {
    let snakeOrderIndex = currentPick;

    snakeOrderIndex += isPrev ? -1 : 1;

    snakeOrderIndex -= Math.floor(snakeOrderIndex / 8);

    let nextTeamIndex = snakeOrder[(snakeOrderIndex + 1) % snakeOrder.length];
    let nextTeamIndex2 = snakeOrder[(snakeOrderIndex + 2) % snakeOrder.length];

    setNextTeams([nextTeamIndex, nextTeamIndex2]);
  };

  const updatePrevTeams = (isPrev: boolean) => {
    let snakeOrderIndex = currentPick;

    snakeOrderIndex += isPrev ? -1 : 1;

    snakeOrderIndex -= Math.floor(snakeOrderIndex / 8);

    let prevTeamIndex = snakeOrder[(snakeOrderIndex - 1) % snakeOrder.length];
    let prevTeamIndex2 = snakeOrder[(snakeOrderIndex - 2) % snakeOrder.length];

    setPrevTeams([prevTeamIndex, prevTeamIndex2]);
  };

  const handlePrevPick = () => {
    if (currentPick > 0) {
      if (pickedPlayers.length - 1 === currentPick) {
        handleUndoPick();
      }

      let prevTeam = currentTeam;
      let prevRound = currentRound;

      if (isReverse) {
        if (currentTeam === 7) {
          prevRound -= 1;
        } else {
          prevTeam += 1;
        }
      } else {
        if (currentTeam === 0) {
          prevRound -= 1;
        } else {
          prevTeam -= 1;
        }
      }

      updatePrevTeams(true);

      setCurrentTeam(prevTeam);
      setCurrentRound(prevRound);
      setCurrentPick(currentPick - 1);

      updateNextTeams(true);
    }
  };

  const handleNextPick = () => {
    if (currentPick < 8 * 8 - 1 && pickedPlayers.length - 1 === currentPick) {
      setSelectedPlayer(null);

      let nextTeam = currentTeam;
      let nextRound = currentRound;

      if (isReverse) {
        if (currentTeam === 0) {
          nextRound++;
        } else {
          nextTeam--;
        }
      } else {
        if (currentTeam === 7) {
          nextRound++;
        } else {
          nextTeam++;
        }
      }

      updatePrevTeams(false);

      setCurrentTeam(nextTeam);
      setCurrentRound(nextRound);
      setCurrentPick(currentPick + 1);

      updateNextTeams(false);
    } else {
      toast.error("Select a player to continue");
    }
  };

  if (loading) {
    return (
      <>
        <h1></h1>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className="min-h-screen flex flex-col">
        {/* Top Bar */}
        <div id="top">
          <div className="columns-3 gap-4">
            <div className="text-cdc-darkred text-3xl text-right">
              Last Pick:{" "}
              {prevTeams[0] !== undefined && (
                <>{teams[prevTeams[0]].captain.username_clean}</>
              )}
            </div>
            <div className="pt-2 pb-2 text-white text-3xl text-center mix-blend-difference">
              Currently Picking: {teams[currentTeam].captain.username_clean}
            </div>
            <div className="text-cdc-darkred text-3xl text-left">
              Next Pick:{" "}
              {nextTeams[0] !== undefined && (
                <>{teams[nextTeams[0]].captain.username_clean}</>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex">
          {/* First Column */}
          <div className="flex flex-col w-1/3 p-4 space-y-4">
            {/* Already Picked Teams */}
            <div className="flex space-x-4 ">
              <div
                id="subPlayerBG"
                className="flex-1 bg-gray-200 p-1 h-[430px] border-2 border-cdc-grey"
              >
                {prevTeams[1] !== undefined && (
                  <>
                    <PlayerCard
                      username={teams[prevTeams[1]].captain.username}
                      avatar_url={teams[prevTeams[1]].captain.avatar_url}
                      bws_rank={teams[prevTeams[1]].captain.bws_rank}
                      isDark={false}
                    />
                    {teams[prevTeams[1]].players.map((player, index) => (
                      <PlayerCard
                        key={index}
                        username={player.username}
                        avatar_url={player.avatar_url}
                        bws_rank={player.bws_rank}
                        isDark={false}
                      />
                    ))}
                  </>
                )}
              </div>
              <div
                id="subPlayerBG"
                className="flex-1 bg-gray-200 p-1 h-[430px] border-2 border-cdc-grey"
              >
                {prevTeams[0] !== undefined && (
                  <>
                    <PlayerCard
                      username={teams[prevTeams[0]].captain.username}
                      avatar_url={teams[prevTeams[0]].captain.avatar_url}
                      bws_rank={teams[prevTeams[0]].captain.bws_rank}
                      isDark={false}
                    />
                    {teams[prevTeams[0]].players.map((player, index) => (
                      <PlayerCard
                        key={index}
                        username={player.username}
                        avatar_url={player.avatar_url}
                        bws_rank={player.bws_rank}
                        isDark={false}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="text-white">
              <SearchBox players={players} onClick={handlePlayerSelect} />
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col w-1/3 p-4 space-y-4">
            {/* Large Team Box */}
            <div
              id="mainPlayerBG"
              className="flex-grow bg-cdc-darkgrey p-4 text-2xl text-white"
            >
              {/* Add Current Player Cards based on the current team */}
              <CurrentPlayerCard
                username={teams[currentTeam].captain.username}
                avatar_url={teams[currentTeam].captain.avatar_url}
                bws_rank={teams[currentTeam].captain.bws_rank}
                accuracy={teams[currentTeam].captain.accuracy}
                bws_badges={teams[currentTeam].captain.tournament_badge_count}
              />
              {teams[currentTeam].players.map((player, index) => {
                console.log(`Player ${index}:`, player); // Log each player's data
                return (
                  <CurrentPlayerCard
                    key={index}
                    username={player.username}
                    avatar_url={player.avatar_url}
                    bws_rank={player.bws_rank}
                    accuracy={player.accuracy}
                    bws_badges={player.tournament_badge_count}
                  />
                );
              })}
            </div>
            {/* Buttons Area */}
            {/* TODO: Move to components*/}
            <div className="justify-center items-center flex space-x-4">
              {/* Prev Button */}
              <button
                id="button"
                onClick={handlePrevPick}
                className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              {/* Undo Button */}
              <button
                id="button"
                onClick={handleUndoPick}
                className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                id="button"
                onClick={handleNextPick}
                className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Third Column */}
          <div className="flex flex-col w-1/3 p-4 space-y-4">
            {/* Upcoming Teams */}
            <div className="flex space-x-4">
              <div
                id="subPlayerBG"
                className="flex-1 bg-gray-200 p-1 h-[430px] border-2 border-cdc-grey"
              >
                {nextTeams[0] !== undefined && (
                  <>
                    <PlayerCard
                      username={teams[nextTeams[0]].captain.username}
                      avatar_url={teams[nextTeams[0]].captain.avatar_url}
                      bws_rank={teams[nextTeams[0]].captain.bws_rank}
                      isDark={false}
                    />
                    {teams[nextTeams[0]].players.map((player, index) => (
                      <PlayerCard
                        key={index}
                        username={player.username}
                        avatar_url={player.avatar_url}
                        bws_rank={player.bws_rank}
                        isDark={false}
                      />
                    ))}
                  </>
                )}
              </div>
              <div
                id="subPlayerBG"
                className="flex-1 bg-gray-200 p-1 h-[430px] border-2 border-cdc-grey"
              >
                {nextTeams[1] !== undefined && (
                  <>
                    <PlayerCard
                      username={teams[nextTeams[1]].captain.username}
                      avatar_url={teams[nextTeams[1]].captain.avatar_url}
                      bws_rank={teams[nextTeams[1]].captain.bws_rank}
                      isDark={false}
                    />
                    {teams[nextTeams[1]].players.map((player, index) => (
                      <PlayerCard
                        key={index}
                        username={player.username}
                        avatar_url={player.avatar_url}
                        bws_rank={player.bws_rank}
                        isDark={false}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            {/* Discord Captain Chat */}
            <div className="flex-grow bg-green-screen p-4 border-2 border-cdc-darkgrey"></div>
          </div>
        </div>

        <FooterModal
          players={players}
          teams={teams}
          pickedPlayers={pickedPlayers}
        />
        {selectedPlayer && (
          <DraftedModal
            user={selectedPlayer}
            about={selectedPlayer.about}
            teamName={teams[currentTeam].captain.username_clean}
            onClose={() => setSelectedPlayer(null)}
          />
        )}
      </main>
    </>
  );
}
