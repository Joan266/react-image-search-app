import { deleteFav } from "../../slices/FavSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FileSaver from "file-saver";
import trashIcon from "../../public/trash.svg";
import searchIcon from "../../public/search-grey.svg";
import downloadIcon from "../../public/download.svg";
import eyeSlashIcon from "../../public/eye-slash-grey.svg";
import "./FavPage.css";

export const FavPage = () => {  
  const dispatch = useDispatch();
  const { data: favData } = useSelector((state) => state.fav);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [favDataMutation, setFavDataMutation] = useState(null);

  const handleRemoveFav = (event, image) => {
    event.stopPropagation();
    dispatch(deleteFav(image));
  };

  const handleGalleryItemClick = (image) => {
    navigate(`/photo/${image.id}`, { state: { image } });
  };

  const handleChange = (event) => {
    setInputData(event.target.value.trim());
  };

  const handleSortItemChange = (event) => {
    const selectedValue = event.target.value;
  
    const dataToSort = favDataMutation || favData;
  
    const sortedFavData = [...dataToSort].sort((a, b) => 
      a[selectedValue] > b[selectedValue] ? -1 : a[selectedValue] < b[selectedValue] ? 1 : 0
    );
  
    setFavDataMutation(sortedFavData);
  };
  
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  const handleDownload = (event, image_urls_raw) => {
    event.stopPropagation();
    FileSaver.saveAs(image_urls_raw, "oxygen-photo.jpg");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredFavData = favData.filter((favImage) => {
      const description = favImage.description !== undefined && favImage.description !== null ? favImage.description : favImage.alt_description;
      return description.toLowerCase().includes(inputData.toLowerCase());
    });
    setFavDataMutation(filteredFavData);
  };

  const renderFavData = favDataMutation || favData;

  return (
    <div className="fav-page">
      <section className="fav-page__header">
        <div className="fav-page__header__title">
          Imagenes favoritas
          <span className="fav-page__header__fav-num">
            <img className="fav-page__header__fav-num__img"  src={eyeSlashIcon} alt="eye slash icon" />
            {`${renderFavData.length} elementos`}
          </span>
        </div>
        <div className="fav-page__header__controls">
          <div className="fav-page__header__search-bar-container">
            <article className="search-bar">
              <img
                src={searchIcon}
                className="search-bar__icon"
                alt="search icon"
              ></img>
              <form onSubmit={handleSubmit} className="search-bar__form">
                <input
                  placeholder="Busqueda"
                  onChange={handleChange}
                  value={inputData}
                  className="search-bar__form__input"
                />
              </form>
            </article>
          </div>
          <div className="fav-page__header__select-filter-container">
            <select className="sort-order" onChange={handleSortItemChange} defaultValue="">
              <option className="sort-order__item" value="" disabled>Ordenar por</option>
              <option className="sort-order__item" value="importDate">Import Date</option>
              <option className="sort-order__item" value="width">Width</option>
              <option className="sort-order__item" value="height">Height</option>
              <option className="sort-order__item" value="likes">Likes</option>
            </select>
          </div>
        </div>
      </section>
      <section className="gallery">
        {renderFavData.length > 0 &&
          renderFavData.map((image) => (
            <figure
              className="gallery__item"
              key={image.id}
              onClick={() => handleGalleryItemClick(image)}
            >
              <div className="gallery__item__mask gallery__item__mask--top">
                <button
                  className="gallery__item__mask__button"
                  onClick={(event) => handleRemoveFav(event, image)}
                >
                  <img
                    src={trashIcon}
                    alt="trash icon"
                    className="gallery__item__mask__button__img"
                  ></img>
                </button>
                <button
                  className="gallery__item__mask__button"
                  onClick={(event) => handleDownload(event, image.urls.raw)}
                >
                  <img src={downloadIcon} alt="download icon" className="gallery__item__mask__button__img" />
                </button>
              </div>
              <div className="gallery__item__mask gallery__item__mask--bottom">
              </div>
              <section className="gallery__item__mask gallery__item__mask--data">
                <div className="gallery__item__description">
                  {truncateText(image?.description, 40)}
                </div>
                <div className="gallery__item__pills-list">
                  <article className="gallery__item__pill">
                    {`Width ${image.width}`} 
                  </article>
                  <article className="gallery__item__pill">
                    {`Height ${image.height}`} 
                  </article>
                  <article className="gallery__item__pill">
                    {`Likes ${image.likes}`}
                  </article>
                  <article className="gallery__item__pill">
                    {image.importDate}
                  </article>
                </div>
              </section>
              <img
                className="gallery__img"
                src={image.urls.small}
                alt={`Image ${image.id}`}
              />
            </figure>
          ))}
      </section>
    </div>
  )
}
