import React from "react";

interface PlayerCardProps {
  username: string;
  avatar_url: string;
  bws_rank: number;
  onClick?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  username,
  avatar_url,
  bws_rank,
  onClick,
}) => {
  return (
    <div
      className="flex items-center p-1 border-b border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={avatar_url}
        alt={`${username}'s avatar`}
        className="w-10 h-10 mr-3"
      />
      <div className="flex-grow">
        <div className="font-bold">{username}</div>
      </div>
      <div className="text-gray-600">{"#" + bws_rank.toLocaleString()}</div>
    </div>
  );
};

export default PlayerCard;
