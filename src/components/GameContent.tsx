import React from 'react';

interface GameContentProps {
  children: React.ReactNode;
}
const GameContent = ({ children }: GameContentProps) => {
  return <div className="static">{children}</div>;
};

export default GameContent;
