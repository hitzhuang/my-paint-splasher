import { useEffect, useState } from 'react';
import GameController from '../game/GameController';
import UIScore from './UIScore';
import Canvas from './Canvas';
import GameContent from './GameContent';
import UIGameOver from './UIGameOver';
import UIGamePauseButton from './UIGamePauseButton';

const ShooterGame = () => {
  const updateStatus = (status: string, value: any) => {
    if (status === 'score') setScore((prev) => prev + value);
    else {
      setStatus(status);
      switch (status) {
        case 'game_over':
          game.shutdown();
          break;
        case 'restart':
          game.start();
          setScore(0);
          break;
        case 'paused':
          game.pause();
          break;
        case 'continue':
          game.start();
          break;
      }
      setGame(game);
    }
  };
  const [status, setStatus] = useState('');
  const [score, setScore] = useState(0);
  const [game, setGame] = useState<GameController>(
    new GameController(updateStatus)
  );

  useEffect(() => {
    game.start();
    return () => game.shutdown();
  }, [game]);

  const renderMenuPopup = () => {
    switch (status) {
      case 'game_over':
        return <UIGameOver onRestart={() => game.updateStatus('restart')} />;
      default:
        return null;
    }
  };

  return (
    <GameContent>
      <Canvas game={game} />
      <UIScore score={score} />
      <UIGamePauseButton
        onClick={(paused) =>
          paused ? game.updateStatus('paused') : game.updateStatus('continue')
        }
      />
      {renderMenuPopup()}
    </GameContent>
  );
};

export default ShooterGame;
