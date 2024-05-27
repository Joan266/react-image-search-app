import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FileSaver from "file-saver";

import { useSearchState } from "../hooks/useSearchState";
import { useDispatch } from "react-redux";
import { addFav, deleteFav } from "../slices/favSlice";

import downloadIcon from "../public/download-black.svg";
import saveIconGreen from "../public/save-green.svg";
import saveIconBlack from "../public/save-black.svg";
import editIcon from "../public/edit.svg";
import { useIsPhotoFav } from "../hooks/useIsPhotoFav";

export const PhotoPage = () => {
  const [photoData, setPhotoData] = useState(null);
  const { id } = useParams();
  const { searchData, searchStatus, searchError } = useSearchState();
  const dispatch = useDispatch();
  const { isPhotoFav } = useIsPhotoFav(id);
  useEffect(() => {
    if (searchData && id) {
      const photoDataResult = searchData.find(fav => fav.id === id);
      setPhotoData(photoDataResult || null);
      console.log(photoDataResult);
    }
  }, [id, searchData]);
  const handleDownload = (event, image_urls_raw) => {
    event.stopPropagation();
    FileSaver.saveAs(image_urls_raw, "oxygen-photo.jpg");
  };

  const handleToggleFav = (event, image) => {
    event.stopPropagation();
    if(isPhotoFav) {
      dispatch(deleteFav(image));
    } else {
      dispatch(addFav(image));
    }
  };
  const handleEditDescription = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="photo-page">
      {photoData ? (
        <section className="details">
          <article className="details__container">
            <img className="details__container__img" src={photoData.urls.regular} alt={photoData.alt_description} />
          </article>
          <article className="details__info">
            <section className="details__info__description">
              <p className="details__info__description__text">{photoData.description || photoData.alt_description}</p>
            </section>
            <section className="details__info__data">
              <div className="details__info__data__item"><p>Downloads</p> <span>{photoData.downloads}</span></div>
              <div className="details__info__data__item"><p>Likes</p> <span>{photoData.likes}</span></div>
              <div className="details__info__data__item"><p>Views</p> <span>{photoData.views}</span></div>
              <div className="details__info__data__item"><p>Height</p> <span>{photoData.height}</span></div>
              <div className="details__info__data__item"><p>Width</p> <span>{photoData.width}</span></div>
            </section>
            <section className="details__info__actions">
             {isPhotoFav && 
                <button
                  className="details__info__actions__button"
                  onClick={(event) => handleEditDescription(event)}
                >
                  <img src={editIcon} alt="edit icon" className="details__info__actions__button__img" />
                  Editar</button>
              } 
              <button
                className = {isPhotoFav? "details__info__actions__button --saved":"details__info__actions__button"} 
                onClick={(event) => handleToggleFav(event, photoData)}
              >
                <img src={isPhotoFav? saveIconGreen:saveIconBlack} alt="save icon" className="details__info__actions__button__img" />
                Guardar
              </button>
              <button
                className="details__info__actions__button"
                onClick={(event) => handleDownload(event, photoData.urls.raw)}
              >
                <img src={downloadIcon} alt="download icon" className="details__info__actions__button__img" />
                Descargar
              </button>
            </section>
          </article>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
