import React, { useState } from "react";

type GameOverModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userName: string) => void;
  userTime: number;
  userTurns: number;
  userScore: number;
};

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userTime,
  userTurns,
  userScore,
}) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = () => {
    onSubmit(userName);
    setUserName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Game Over</h2>
        <p>Time Taken: {userTime} seconds</p>
        <p>Number of Turns: {userTurns}</p>
        <p>Score: {userScore}</p>
        <input
          type="text"
          className="border p-2 w-full mt-4"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="mt-2 p-2 bg-gray-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
