import { useState } from 'react';
import ActionButton from './ActionButton';
import OptionButton from './OptionButton';
import UIBackdrop from './UIBackdrop';
import UITitle from './UITitle';

interface UINewGameProps {
  onNext: () => void;
  onSelect: (color: string) => void;
}

const UINewGame = ({ onNext, onSelect }: UINewGameProps) => {
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
    setTimeout(() => onNext(), 500);
  };

  return (
    <UIBackdrop open={open}>
      <UITitle message="Choose Your Favorite Color" sx="text-5xl" />
      <div className="grid grid-cols-3 sm:grid-cols-6 my-8">
        <OptionButton
          id="white"
          onClick={handleSelect}
          color={`bg-white ${
            color === 'white' ? 'border-gray-400/50' : 'border-white'
          }`}
        />
        <OptionButton
          id="red-300"
          onClick={handleSelect}
          color={`bg-red-300 ${
            color === 'red-300' ? 'border-white/50' : `border-red-300`
          }`}
        />
        <OptionButton
          id="yellow-200"
          onClick={handleSelect}
          color={`bg-yellow-200 ${
            color === 'yellow-200' ? 'border-white/80' : `border-yellow-200`
          }`}
        />
        <OptionButton
          id="green-300"
          onClick={handleSelect}
          color={`bg-green-300 ${
            color === 'green-300' ? 'border-white/70' : `border-green-300`
          }`}
        />
        <OptionButton
          id="purple-300"
          onClick={handleSelect}
          color={`bg-purple-300 ${
            color === 'purple-300' ? 'border-white/50' : `border-purple-300`
          }`}
        />
        <OptionButton
          id="blue-300"
          onClick={handleSelect}
          color={`bg-blue-300 ${
            color === 'blue-300' ? 'border-white/50' : `border-blue-300`
          }`}
        />
      </div>
      <ActionButton label="Next" onClick={handleClick} />
    </UIBackdrop>
  );
};

export default UINewGame;
