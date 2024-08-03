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
    <div className="flex items-center p-4 border-b border-gray-300">
      <img
        src={avatar_url}
        alt={`${username}'s avatar`}
        className="w-[65px] h-[65px] mr-4"
      />
      <div className="flex-grow">
        <div className="font-bold text-xl">{username}</div>
        <div className="text-gray-600">Accuracy: 98.5%, Badges: 25</div>
      </div>
      <div className="text-gray-600 text-2xl">
        {"#" + bws_rank.toLocaleString()}
      </div>
    </div>
  );
};

export default CurrentPlayerCard;
