import { useState } from 'react';
import ActionButton from './ActionButton';
import UIBackdrop from './UIBackdrop';

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
      <h1 className=" text-white text-8xl font-extrabold mb-10">GAME OVER</h1>
      <ActionButton label="RESTART" onClick={handleClick} />
    </UIBackdrop>
  );
};

export default UIGameOver;
