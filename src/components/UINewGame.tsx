import { useState } from 'react';
import ActionButton from './ActionButton';
import SelectButton from './SelectButton';
import UIBackdrop from './UIBackdrop';

interface UINewGameProps {
  onStart: () => void;
  onSelect: (color: string) => void;
}

const UINewGame = ({ onStart, onSelect }: UINewGameProps) => {
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState('white');
  const handleSelect = (selectedColor: string) => {
    setColor(selectedColor);
    switch (selectedColor) {
      case 'red-300':
        onSelect('rgb(252,165,165)');
        break;
      case 'yellow-200':
        onSelect('rgb(254,240,138)');
        break;
      case 'green-300':
        onSelect('rgb(134,239,172)');
        break;
      case 'purple-300':
        onSelect('rgb(216,180,254)');
        break;
      case 'blue-300':
        onSelect('rgb(147,197,253)');
        break;
      default:
        onSelect('rgb(255,255,255)');
        break;
    }
  };
  const handleClick = () => {
    setOpen(false);
    setTimeout(() => onStart(), 500);
  };

  return (
    <UIBackdrop open={open}>
      <h1 className="text-white text-5xl font-extrabold text-center">
        Choose Your Favorite Color
      </h1>
      <div className="flex flex-row w-full justify-center items-center my-8">
        <SelectButton
          id="white"
          onClick={handleSelect}
          color={`bg-white ${
            color === 'white' ? 'border-gray/50' : 'border-white'
          }`}
        />
        <SelectButton
          id="red-300"
          onClick={handleSelect}
          color={`bg-red-300 ${
            color === 'red-300' ? 'border-white/50' : `border-red-300`
          }`}
        />
        <SelectButton
          id="yellow-200"
          onClick={handleSelect}
          color={`bg-yellow-200 ${
            color === 'yellow-200' ? 'border-white/80' : `border-yellow-200`
          }`}
        />
        <SelectButton
          id="green-300"
          onClick={handleSelect}
          color={`bg-green-300 ${
            color === 'green-300' ? 'border-white/70' : `border-green-300`
          }`}
        />
        <SelectButton
          id="purple-300"
          onClick={handleSelect}
          color={`bg-purple-300 ${
            color === 'purple-300' ? 'border-white/50' : `border-purple-300`
          }`}
        />
        <SelectButton
          id="blue-300"
          onClick={handleSelect}
          color={`bg-blue-300 ${
            color === 'blue-300' ? 'border-white/50' : `border-blue-300`
          }`}
        />
      </div>
      <ActionButton label="START" onClick={handleClick} />
    </UIBackdrop>
  );
};

export default UINewGame;
