import { useEffect, useState } from 'react';
import GameController from '../game/GameController';
import Canvas from './Canvas';
import GameContent from './GameContent';
import UIScore from './UIScore';
import UINewGame from './UINewGame';
import UIGameOver from './UIGameOver';
import PauseIconButton from './PauseIconButton';
import MuteIconButton from './MuteIconButton';

const ShooterGame = () => {
  const [status, setStatus] = useState('game_new');
  const [game] = useState<GameController>(
    new GameController((status) => setStatus(status))
  );

  useEffect(() => {
    setStatus('game_new');
    return () => game.shutdown();
  }, [game]);

  const IsPlaying = () => status !== 'game_new' && status !== 'game_shutdown';

  const renderMenuPopup = () => {
    switch (status) {
      case 'game_new':
        return (
          <UINewGame
            onStart={() => game.start()}
            onSelect={(color) => game.selectPlayerColor(color)}
          />
        );
      case 'game_shutdown':
        return <UIGameOver onRestart={() => game.start()} />;
      default:
        return null;
    }
  };

  return (
    <GameContent>
      <Canvas game={game} />
      {renderMenuPopup()}
      <UIScore score={game?.score} highScore={game?.highScore} />
      <MuteIconButton onClick={(muted) => game.soundMgr.mute(muted)} />
      {IsPlaying() && (
        <PauseIconButton
          onClick={(paused) => (paused ? game.paused() : game.continue())}
        />
      )}
    </GameContent>
  );
};

export default ShooterGame;
