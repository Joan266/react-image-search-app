import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import searchIcon from "../public/search.svg";

export const SearchBarComponent = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");

  const handleChange = (event) => {
    setInputData(event.target.value.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputData === "") return;
    navigate(`/search/${inputData}`);
  };

  return (
    <article className="search-bar">
      <img src={searchIcon} className="search-bar__icon" alt="search icon"></img>
      
      <form onSubmit={handleSubmit} className="search-bar__form">
        <input 
          placeholder="Buscar todas las imagenes de Oxygenphotos" 
          onChange={handleChange} 
          value={inputData}
          className="search-bar__form__input"
        />
      </form>
    </article>
  );
};
