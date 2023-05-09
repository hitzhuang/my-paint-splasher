import { useState } from 'react';
import ActionButton from './ActionButton';
import UIBackdrop from './UIBackdrop';
import UITitle from './UITitle';

interface UIGameOverProps {
  onRestart: () => void;
  onNewGame: () => void;
}

const UIGameOver = ({ onRestart, onNewGame }: UIGameOverProps) => {
  const [open, setOpen] = useState(true);

  const handleClick = (restart: boolean) => {
    setOpen(false);
    setTimeout(() => (restart ? onRestart() : onNewGame()), 500);
  };

  return (
    <UIBackdrop open={open}>
      <UITitle
        sx="lg:text-8xl md:text-7xl text-6xl mb-10"
        message="GAME OVER"
      />
      <ActionButton label="Restart" onClick={() => handleClick(true)} />
      <div className="my-2"></div>
      <ActionButton label="New Game" onClick={() => handleClick(false)} />
    </UIBackdrop>
  );
};

export default UIGameOver;
