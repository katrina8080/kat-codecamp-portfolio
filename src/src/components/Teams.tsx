'use client';

import React from 'react';

const Teams = ({ name, position, profile }) => {
  return (
    <div>
      <div className="text-white flex flex-col items-center">
        <img className="flex  object-cover aspect-square h-[250px]" src={profile} alt="" />
        <div className="pt-5">{name}</div>
        <div className="text-sm font-light text-gray-300">{position}</div>
      </div>
    </div>
  );
};

export default Teams;
