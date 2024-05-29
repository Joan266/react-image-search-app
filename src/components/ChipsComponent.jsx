import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const ChipsComponent = ({ searchWords }) => {
  const navigate = useNavigate();
  const [shuffledWords, setShuffledWords] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray([...searchWords]).slice(0, 10);
    setShuffledWords(shuffled);
  }, [searchWords]);

  const handleClick = (event, word) => {
    event.stopPropagation();
    navigate(`/search/${word}`);
  };

  return (
    <article className="chips">
      {shuffledWords.map((word) => (
        <button
          key={word}
          className="chips__item"
          onClick={(event) => handleClick(event, word)}
        >
          {word}
        </button>
      ))}
    </article>
  );
};
