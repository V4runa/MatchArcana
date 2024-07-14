import React from "react";
import classNames from "classnames";

type MatchCardProps = {
  id: number;
  name: string;
  imgUrl: string;
  isSelected: boolean;
  isMatched: boolean;
  isObstacle?: boolean;
  onClick: (id: number) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({
  id,
  name,
  imgUrl,
  isSelected,
  isMatched,
  isObstacle,
  onClick,
}) => {
  const flipCardStyles = {
    perspective: "1000px",
    width: "150px",
    height: "200px",
  };

  const cardStyles = {
    width: "100%",
    height: "100%",
    position: "relative" as "relative",
    transformStyle: "preserve-3d" as "preserve-3d",
    transition: "transform 0.6s",
    transform: isSelected || isMatched ? "rotateY(180deg)" : "rotateY(0)",
  };

  const frontBackStyles = {
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden" as "hidden",
    position: "absolute" as "absolute",
    top: "0",
    left: "0",
  };

  const backStyles = {
    ...frontBackStyles,
    transform: "rotateY(180deg)",
  };

  return (
    <div
      className={classNames(
        "relative border rounded shadow cursor-pointer transition-transform transform",
        {
          "bg-green-200": isMatched,
          "bg-blue-200": isSelected && !isMatched && !isObstacle,
          "bg-red-200": isObstacle && isSelected,
          "bg-white": !isSelected && !isMatched && !isObstacle,
          "scale-105": isSelected || isMatched,
        }
      )}
      onClick={() => onClick(id)}
      style={{ width: "150px", height: "200px" }}
    >
      <div style={flipCardStyles}>
        <div style={cardStyles}>
          <div
            style={frontBackStyles}
            className="bg-gray-300 flex items-center justify-center rounded"
          >
            {!isSelected && !isMatched && (
              <div className="text-lg font-bold">?</div>
            )}
          </div>
          <div style={backStyles}>
            {(isSelected || isMatched) && (
              <img
                src={imgUrl}
                alt={name}
                className="w-full h-full object-cover rounded"
                style={{ display: isSelected || isMatched ? "block" : "none" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
