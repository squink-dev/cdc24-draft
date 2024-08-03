import React from "react";

interface PlayerCardProps {
  username: string;
  avatar_url: string;
  bws_rank: number;
}

const CurrentPlayerCard: React.FC<PlayerCardProps> = ({
  username,
  avatar_url,
  bws_rank,
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
              Accuracy: 98.5%, Badges: 25
            </div>
          </div>
        </div>
        <div id="bolsterBold">
          <div className="text-white text-2xl">
            {"#" + bws_rank.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayerCard;
