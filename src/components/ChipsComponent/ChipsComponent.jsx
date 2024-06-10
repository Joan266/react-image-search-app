import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./ChipsComponent.css";
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export const ChipsComponent = () => {
  const searchWords = [
    "naturaleza", "paisaje", "ciudad", "viaje", "playa", "montaña", "selva",
    "arquitectura",   "animales",  "comida", "tecnología", 
     "construcción","niños","pareja","familia","flor","insecto","jardin",
    "cielo", "agua", "perro","gato","mujer","hombre","bosque","desierto"
  ];
  const navigate = useNavigate();
  const [shuffledWords, setShuffledWords] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray([...searchWords]).slice(0, 10);
    setShuffledWords(shuffled);
  }, []);

  const handleClick = (event, word) => {
    event.stopPropagation();
    navigate(`/search?query=${word}&page=1`);
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
