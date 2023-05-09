import { useEffect, useState } from 'react';
import UIBackdrop from './UIBackdrop';
import UITitle from './UITitle';
import ActionButton from './ActionButton';
import OptionButton from './OptionButton';
import { GAME_DIFFICULTY } from '../game/Constant';

interface UIGameLevelProps {
  onStart: () => void;
  onSelect: (level: string) => void;
  onBack: () => void;
}

const UIGameLevel = ({ onSelect, onBack, onStart }: UIGameLevelProps) => {
  const difficulty = localStorage.getItem(GAME_DIFFICULTY);
  const [open, setOpen] = useState(true);
  const [level, setLevel] = useState(difficulty ?? 'moderate');

  useEffect(() => {
    onSelect(level);
  }, [level, onSelect]);

  const handleClick = (back: boolean) => {
    setOpen(false);
    setTimeout(() => (back ? onBack() : onStart()), 500);
  };

  return (
    <UIBackdrop open={open}>
      <UITitle message="Select Game Difficulty" sx="text-5xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-8">
        <OptionButton
          id="easy"
          circle={false}
          onClick={(id) => setLevel(id)}
          color={
            level === 'easy'
              ? 'border-white text-white'
              : 'border-gray-200/50 text-gray-500'
          }
        />
        <OptionButton
          id="moderate"
          circle={false}
          onClick={(id) => setLevel(id)}
          color={
            level === 'moderate'
              ? 'border-white text-white'
              : 'border-gray-200/50 text-gray-500'
          }
        />
        <OptionButton
          id="challenging"
          circle={false}
          onClick={(id) => setLevel(id)}
          color={
            level === 'challenging'
              ? 'border-white text-white'
              : 'border-gray-200/50 text-gray-500'
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ActionButton
          label="Back"
          backgroundColor="bg-neutral-300"
          onClick={() => handleClick(true)}
        />
        <ActionButton label="Start" onClick={() => handleClick(false)} />
      </div>
    </UIBackdrop>
  );
};

export default UIGameLevel;
