import React from "react";

type Score = {
  userName: string;
  userTime: number;
  userTurns: number;
  userScore: number;
};

type ScoreboardProps = {
  scores: Score[];
};

const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h2 className="text-xl font-bold mb-2">Scoreboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li
            key={index}
            className="border p-2 mb-2 rounded bg-white bg-opacity-20 text-white"
          >
            <p>
              <strong>Name:</strong> {score.userName}
            </p>
            <p>
              <strong>Time:</strong> {score.userTime} seconds
            </p>
            <p>
              <strong>Turns:</strong> {score.userTurns}
            </p>
            <p>
              <strong>Score:</strong> {score.userScore}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
