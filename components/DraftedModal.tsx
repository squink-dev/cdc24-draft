/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/interfaces/interfaces";

interface DraftedModalProps {
  user: User;
  about: string;
  teamName: string;
  onClose: () => void;
}

const DraftedModal: React.FC<DraftedModalProps> = ({
  user,
  about,
  teamName,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 1000);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      id="screen"
      className={`fixed inset-0 z-10 bg-black bg-opacity-80 flex items-end justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        id="drafted"
        className="fixed inset-0 z-30 flex items-end justify-center"
      ></div>
      <div
        id="bolsterBoldBig"
        className="fixed z-50 rotate-60 opacity-45 -translate-x-[63%] -translate-y-[50%] text-cdc-lightgrey"
      >
        <div className="animate-rightleft-scroll">drafted</div>
      </div>
      <div
        id="bolsterBoldBigger"
        className={`fixed z-50 rotate-60 opacity-30 -translate-x-[55%] -translate-y-[-150%] text-cdc-lightgrey transition-opacity duration-5000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-leftright-scroll">2024</div>
      </div>

      <div
        id="bolsterBoldBiggest"
        className="fixed z-40 text-cdc-red text-right right-10 -top-5"
      >
        <div className="animate-draft-scroll">
          Team<br></br>
          {teamName}
        </div>
      </div>

      <div
        id="name"
        className="fixed z-20 text-right -right-[25%] opacity-100 text-transparent text-nowrap"
      >
        <div className="animate-rightleft-scrollslow">{user.username}</div>
      </div>

      <div
        id="draftModal"
        className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[26%] h-[32%] p-10 shadow-lg transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt={`${user.username}'s avatar`}
            className="w-32 h-32 absolute top-[-45%]"
          />
          <h2 id="rubik" className="text-2xl text-white mt-8">
            {user.username.toUpperCase()}
          </h2>
          <h2 id="bolsterBold" className="text-2xl text-white text-center">
            Team {teamName}
          </h2>
          <div
            id="playBold"
            className="flex justify-between w-full mt-2 text-xl text-white font-semibold"
          >
            <span className="text-left">Rank</span>
            <span className="text-right">
              #{user.bws_rank.toLocaleString()}
            </span>
          </div>
          <p
            id="playBold"
            className="mt-2 text-cdc-lightgrey w-full h-[100px] pt-2 text-wrap truncate"
          >
            {about}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraftedModal;
