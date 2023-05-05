import React from 'react';
import pjson from '../../package.json';

interface GameContentProps {
  children: React.ReactNode;
}

const GameContent = ({ children }: GameContentProps) => {
  return (
    <div className="static select-none">
      {children}
      <div className="absolute right-2 bottom-1 text-white text-xs">
        V{pjson.version}
      </div>
    </div>
  );
};

export default GameContent;
