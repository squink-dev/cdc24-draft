/* eslint-disable @next/next/no-img-element */
import React from "react";

interface PlayerCardProps {
  username: string;
  avatar_url: string;
  bws_rank: number;
  accuracy: number;
  bws_badges: number;
}

const CurrentPlayerCard: React.FC<PlayerCardProps> = ({
  username,
  avatar_url,
  bws_rank,
  accuracy,
  bws_badges,
}) => {
  return (
    <div id="mainPlayerCard">
      <div className="flex items-center p-4 border-b border-cdc-grey">
        <img
          src={avatar_url}
          alt={`${username}'s avatar`}
          className="w-[65px] h-[65px] mr-4"
        />
        <div className="flex-grow">
          <div className="text-xl text-white">{username}</div>

          <div id="playBold">
            <div className="text-cdc-lightgrey text-lg">
              Accuracy: {accuracy.toPrecision(4)}%, Badges: {bws_badges}
            </div>
          </div>
        </div>
        <div id="bolsterBold">
          <div className="text-cdc-lightgrey text-2xl">
            {"#" + bws_rank.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayerCard;
