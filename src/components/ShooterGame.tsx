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
  const updateStatus = (status: string) => {
    setStatus(status);
    switch (status) {
      case 'game_over':
        game.shutdown();
        break;
      case 'restart':
        game.start();
        break;
      case 'paused':
        game.pause();
        break;
      case 'continue':
        game.continue();
        break;
    }
    setGame(game);
  };
  const [status, setStatus] = useState('game_init');
  const [game, setGame] = useState<GameController>(
    new GameController(updateStatus)
  );

  useEffect(() => {
    game.updateStatus('game_new');
    return () => game.shutdown();
  }, [game]);

  const renderMenuPopup = () => {
    switch (status) {
      case 'game_new':
        return (
          <UINewGame
            onStart={() => game.updateStatus('restart')}
            onSelect={(color) => (game.player.color = color)}
          />
        );
      case 'game_over':
        return <UIGameOver onRestart={() => game.updateStatus('restart')} />;
      default:
        return null;
    }
  };

  const IsPlaying = () =>
    status !== 'game_init' && status !== 'game_new' && status !== 'game_over';

  return (
    <GameContent>
      <Canvas game={game} />
      {renderMenuPopup()}
      <UIScore score={game?.score} highScore={game?.highScore} />
      <MuteIconButton onClick={(muted) => game.soundMgr.mute(muted)} />
      {IsPlaying() && (
        <PauseIconButton
          onClick={(paused) =>
            paused ? game.updateStatus('paused') : game.updateStatus('continue')
          }
        />
      )}
    </GameContent>
  );
};

export default ShooterGame;
