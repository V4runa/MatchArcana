import React from 'react';
import MatchCard from './MatchCard';
import useMatchGame from '../hooks/useMatchCheck';
import '../../app.css'; // Ensure CSS is imported

const GridExample: React.FC = () => {
  const { matchData, handleCardClick, lives, gameOver, resetBoard } = useMatchGame();

  return (
    <div className="container relative p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Memory Matching Game</h1>
        <p className="text-lg">Lives: {lives}</p>
        {gameOver && (
          <div className="text-red-500 text-lg font-bold">
            Game Over!
            <button 
              onClick={resetBoard}
              className="ml-4 p-2 bg-red-500 text-white rounded"
            >
              Restart
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-5 gap-x-3 gap-y-4" style={{ height: 'calc(100% - 100px)', gridTemplateRows: 'repeat(5, 1fr)' }}>
        {matchData.map((data) => (
          <MatchCard
            key={data.id}
            id={data.id}
            name={data.name}
            imgUrl={data.imgUrl}
            isSelected={data.isSelected}
            isMatched={data.isMatched}
            onClick={handleCardClick}
            isObstacle={data.isObstacle}
          />
        ))}
      </div>
    </div>
  );
};

export default GridExample;
