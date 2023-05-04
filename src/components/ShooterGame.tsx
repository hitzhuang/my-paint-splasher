import { useEffect, useState } from 'react';
import GameController from '../game/GameController';
import UIScore from './UIScore';
import Canvas from './Canvas';
import GameContent from './GameContent';
import UIGameOver from './UIGameOver';
import UIGamePauseButton from './UIGamePauseButton';
import UINewGame from './UINewGame';

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
  const [status, setStatus] = useState('');
  const [game, setGame] = useState<GameController>(
    new GameController(updateStatus)
  );

  useEffect(() => {
    game.updateStatus('new_game');
    return () => game.shutdown();
  }, [game]);

  const renderMenuPopup = () => {
    switch (status) {
      case 'new_game':
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

  return (
    <GameContent>
      <Canvas game={game} />
      <UIGamePauseButton
        onClick={(paused) =>
          paused ? game.updateStatus('paused') : game.updateStatus('continue')
        }
      />
      {renderMenuPopup()}
      <UIScore score={game?.score} highScore={game?.highScore} />
    </GameContent>
  );
};

export default ShooterGame;
