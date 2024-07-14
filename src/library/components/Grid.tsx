import React from "react";
import MatchCard from "./MatchCard";

type GridProps = {
  matchData: any[];
  handleCardClick: (id: number) => void;
};

const Grid: React.FC<GridProps> = ({ matchData, handleCardClick }) => {
  return (
    <div
      className="grid grid-cols-5 gap-x-20 gap-y-5"
      style={{
        height: "calc(100% - 100px)",
        gridTemplateRows: "repeat(5, 1fr)",
      }}
    >
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
  );
};

export default Grid;
