import { useState, useEffect } from "react";
import cardData, { CardData } from "../data/CardData";

const useMatchCheck = () => {
  const [data, setData] = useState<CardData[]>(cardData);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [lives, setLives] = useState<number>(3);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const resetBoard = () => {
    setData(cardData);
    setSelectedCards([]);
    setLives(3);
    setGameOver(false);
  };

  const handleCardClick = (id: number) => {
    if (gameOver) return;

    const clickedCard = data.find((card) => card.id === id);

    if (!clickedCard) return;

    // Handle obstacle cards
    if (clickedCard.isObstacle) {
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
      setData((prevData) =>
        prevData.map((card) =>
          card.id === id ? { ...card, isSelected: true } : card
        )
      );
      return;
    }

    // Handle normal cards
    setData((prevData) =>
      prevData.map((card) =>
        card.id === id ? { ...card, isSelected: !card.isSelected } : card
      )
    );

    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cardId) => cardId !== id);
      }
      return [...prevSelected, id];
    });
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstId, secondId] = selectedCards;
      const firstCard = data.find((card) => card.id === firstId);
      const secondCard = data.find((card) => card.id === secondId);

      if (firstCard && secondCard && firstCard.name === secondCard.name) {
        setData((prevData) =>
          prevData.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true, isSelected: false }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setData((prevData) =>
            prevData.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isSelected: false }
                : card
            )
          );
        }, 1000);
      }

      setSelectedCards([]);
    }
  }, [selectedCards, data]);

  return { matchData: data, handleCardClick, lives, gameOver, resetBoard };
};

export default useMatchCheck;
