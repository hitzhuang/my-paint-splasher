import { useState } from 'react';
import ActionButton from './ActionButton';
import UIBackdrop from './UIBackdrop';
import UITitle from './UITitle';

interface UIGameOverProps {
  onRestart: () => void;
}

const UIGameOver = ({ onRestart }: UIGameOverProps) => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(false);
    setTimeout(() => onRestart(), 500);
  };
  return (
    <UIBackdrop open={open}>
      <UITitle
        sx="lg:text-8xl md:text-7xl text-6xl mb-10"
        message="GAME OVER"
      />
      <ActionButton label="RESTART" onClick={handleClick} />
    </UIBackdrop>
  );
};

export default UIGameOver;
