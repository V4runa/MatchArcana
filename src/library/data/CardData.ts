export type CardData = {
  id: number;
  name: string;
  imgUrl: string;
  isSelected: boolean;
  isMatched: boolean;
  isObstacle?: boolean;
};

const majorArcanaNames = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
];

const getRandomSubset = (arr: string[], size: number): string[] => {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const generateCardData = (): CardData[] => {
  const selectedCards = getRandomSubset(majorArcanaNames, 12);

  const uniqueCards: CardData[] = selectedCards.map((name, index) => ({
    id: index + 1,
    name: name,
    imgUrl: `/images/${name.replace(/\s+/g, "_")}.jpg`,
    isSelected: false,
    isMatched: false,
  }));

  const cardPairs = [...uniqueCards, ...uniqueCards].map((card, index) => ({
    ...card,
    id: index + 1,
  }));

  shuffleArray(cardPairs);

  const totalSlots = 25;
  const obstacles = Array.from({ length: 3 }, (_, i) => ({
    id: cardPairs.length + i + 1,
    name: `Obstacle ${i + 1}`,
    imgUrl: `/images/doom_${i + 1}.jpg`,
    isSelected: false,
    isMatched: false,
    isObstacle: true,
  }));

  obstacles.forEach((obstacle) => {
    const randomIndex = Math.floor(Math.random() * (cardPairs.length + 1));
    cardPairs.splice(randomIndex, 0, obstacle);
  });

  return cardPairs.slice(0, totalSlots);
};
