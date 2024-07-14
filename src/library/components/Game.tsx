import React, { useEffect, useState } from 'react';
import useMatchGame from '../hooks/useMatchCheck';
import Grid from './Grid';
import GameOverModal from './GameOverModal';
import Scoreboard from './ScoreBoard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

type Score = {
  userName: string;
  userTime: number;
  userTurns: number;
  userScore: number;
};

const Game: React.FC = () => {
  const { matchData, handleCardClick, lives, gameOver, resetBoard: resetGame } = useMatchGame();
  const [turns, setTurns] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        if (startTime !== null) {
          setElapsedTime(Math.round((Date.now() - startTime) / 1000));
        }
      }, 1000);
    }

    if (gameOver) {
      setIsModalOpen(true);
      if (interval) clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, startTime]);

  const handleCardClickWithMetrics = (id: number) => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }
    handleCardClick(id);
    setTurns(turns + 1);
  };

  const calculateScore = (time: number, turns: number) => {
    return Math.max(0, 1000 - (time + turns * 10));
  };

  const handleSubmitScore = (userName: string) => {
    const userScore = calculateScore(elapsedTime, turns);
    const newScore = { userName, userTime: elapsedTime, userTurns: turns, userScore };
    setScores([...scores, newScore].sort((a, b) => b.userScore - a.userScore));
    setIsModalOpen(false);
    handleResetBoard();
  };

  const handleResetBoard = () => {
    resetGame();
    setGameStarted(false);
    setStartTime(null);
    setElapsedTime(0);
    setTurns(0);
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <FontAwesomeIcon
          key={i}
          icon={i < lives ? faHeart : faHeartBroken}
          className={`inline-block w-6 h-6 ${i < lives ? 'text-red-500' : 'text-gray-500'}`}
        />
      );
    }
    return hearts;
  };

  return (
    <div className="App">
      <div className="flex-container">
        <div className={`container relative p-4 ${gameOver ? 'game-over' : ''}`}>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-white">Match Arcana</h1>
            <div className="flex justify-around items-center text-white text-lg my-4 mx-12">
              <div className="mx-12">
                <h2 className="text-xl font-bold">Lives</h2>
                <div className="flex justify-center">{renderHearts()}</div>
              </div>
              <div className="mx-4">
                <h2 className="text-xl font-bold">Turns</h2>
                <div>{turns}</div>
              </div>
              <div className="mx-4">
                <h2 className="text-xl font-bold">Time</h2>
                <div>{elapsedTime} seconds</div>
              </div>
              <div className="mx-4">
                <h2 className="text-xl font-bold">Score</h2>
                <div>{calculateScore(elapsedTime, turns)}</div>
              </div>
            </div>
          </div>
          <Grid matchData={matchData} handleCardClick={handleCardClickWithMetrics} />
          <GameOverModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitScore}
            userTime={elapsedTime}
            userTurns={turns}
            userScore={calculateScore(elapsedTime, turns)}
          />
        </div>
        <Scoreboard scores={scores} />
        <div id="damage-overlay" className={`fixed top-0 left-0 w-full h-full ${gameOver ? 'bg-red-900 opacity-50' : ''}`}></div>
      </div>
    </div>
  );
};

export default Game;
