import ActionButton from './ActionButton';
import UIOverlay from './UIOverlay';

interface UIGameOverProps {
  onRestart: () => void;
}

const UIGameOver = ({ onRestart }: UIGameOverProps) => (
  <UIOverlay>
    <h1 className=" text-white text-8xl font-extrabold mb-10">GAME OVER</h1>
    <ActionButton label="RESTART" onClick={onRestart} />
  </UIOverlay>
);

export default UIGameOver;
