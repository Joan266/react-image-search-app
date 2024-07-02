import { deleteFav } from "../../slices/FavSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import FileSaver from "file-saver";
import trashIcon from "../../public/trash.svg";
import searchIcon from "../../public/search-grey.svg";
import downloadIcon from "../../public/download.svg";
import eyeSlashIcon from "../../public/eye-slash-grey.svg";
import "./FavPage.css";

export const FavPage = () => {  
  const dispatch = useDispatch();
  const { data: favData } = useSelector((state) => state.fav);
  const favGalleryRef = useRef(null);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [favDataMutation, setFavDataMutation] = useState(null);

  const renderFavData = favDataMutation || favData;

  const handleRemoveFav = (event, image) => {
    event.stopPropagation();
    dispatch(deleteFav(image));
  };

  const handleGalleryItemClick = (image) => {
    navigate(`/photo/${image.id}`, { state: { image } });
  };

  const handleChange = (event) => {
    setInputData(event.target.value);
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
  useEffect(() => {
    if (inputData.trim() === "") {
      setFavDataMutation(null);
      return;
    }
  
    const filteredFavData = favData.filter((favImage) => {
      const description = favImage.description ? favImage.description.trim() : "";
      if (description) {
        const lowercasedDescription = description.toLowerCase();
        const searchQuery = inputData.toLowerCase();
        return lowercasedDescription.includes(searchQuery);
      }
      return false;
    });
  
    setFavDataMutation(filteredFavData);
  }, [inputData]);
  
 
  useEffect(() => {
    const resizeAllMasonryItems = () => {
      const grid = favGalleryRef.current;
      if (!grid) return;
  
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const columnWidth = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ')[0]);
  
      renderFavData.forEach(image => {
        const item = document.getElementById(image.id);
        if (item) {
          const imageHeight = (columnWidth) * image.height / image.width;
          const rowSpan = Math.ceil((imageHeight + rowGap) / (rowHeight + rowGap));
          item.style.gridRowEnd = `span ${rowSpan}`;
        }
      });
    };
  
    resizeAllMasonryItems();
    window.addEventListener('resize', resizeAllMasonryItems);
  
    return () => {
      window.removeEventListener('resize', resizeAllMasonryItems);
    };
  }, [renderFavData]);


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
              <form className="search-bar__form" onSubmit={(event)=>event.preventDefault()}>
                <input
                  placeholder="Buscar descripción"
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
              <option className="sort-order__item" value="width">Width</option>
              <option className="sort-order__item" value="height">Height</option>
              <option className="sort-order__item" value="likes">Likes</option>
            </select>
          </div>
        </div>
      </section>
      <section className="fav-page__gallery" ref={favGalleryRef}>
        {renderFavData.length > 0 &&
          renderFavData.map((image) => (
            <figure
              className="fav-page__gallery__item"
              key={image.id}
              id={image.id}
              onClick={() => handleGalleryItemClick(image)}
            >
              <button
                className="fav-page__gallery__item__button"
                onClick={(event) => handleRemoveFav(event, image)}
              >
                <img
                  src={trashIcon}
                  alt="trash icon"
                  className="fav-page__gallery__item__button__img"
                ></img>
              </button>
              <button
                className="fav-page__gallery__item__button fav-page__gallery__item__button--download"
                onClick={(event) => handleDownload(event, image.urls.raw)}
              >
                <img src={downloadIcon} alt="download icon" className="fav-page__gallery__item__button__img" />
              </button>
              <section className="fav-page__gallery__item__data ">
                <div className="fav-page__gallery__item__description">
                  {truncateText(image?.description, 40)}
                </div>
                <div className="fav-page__gallery__item__pills-list">
                  <article className="fav-page__gallery__item__pill">
                    {`Width ${image.width}`} 
                  </article>
                  <article className="fav-page__gallery__item__pill">
                    {`Height ${image.height}`} 
                  </article>
                  <article className="fav-page__gallery__item__pill">
                    {`Likes ${image.likes}`}
                  </article>
                  <article className="fav-page__gallery__item__pill">
                    {image.importDate}
                  </article>
                </div>
              </section>
              <img
                className="fav-page__gallery__img"
                src={image.urls.small}
                alt={`Image ${image.id}`}
              />
            </figure>
          ))}
      </section>
    </div>
  )
}
