import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import FileSaver from "file-saver";

import downloadIcon from "../../public/download-black.svg";
import saveIconGreen from "../../public/save-green.svg";
import saveIconBlack from "../../public/save-black.svg";
import editIcon from "../../public/edit.svg";
import backArrowIcon from "../../public/back-arrow.svg";
import { useIsPhotoFav } from "../../hooks/useIsPhotoFav";
import { EditDescriptionPopupComponent } from "../../components/EditDescriptionPopupComponent/EditDescriptionPopupComponent.jsx"; 
import "./PhotoPage.css"
export const PhotoPage = () => {
  const location = useLocation();
  const { image } = location.state || {}; 
  const { isPhotoFav, handleToggleFav, photoDescription } = useIsPhotoFav(image);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const navigate = useNavigate();

  const goBackToLastRoute = (event) => {
    event.stopPropagation(); 
    navigate(-1)
  };

  const handleDownload = (event, image_urls_raw) => {
    event.stopPropagation();
    FileSaver.saveAs(image_urls_raw, "oxygen-photo.jpg");
  };

  return (
    <div className="photo-page">
      <section className="photo-page__header">
        <button
          className="photo-page__header__back-arrow-button"
          onClick={goBackToLastRoute}
        >
          <img
            src={backArrowIcon}
            alt="back arrow icon"
            className="photo-page__header__back-arrow-button__img"
          ></img>
        </button>
      </section>
      {image ? (
        <>
          {isEditDescription && (
            <EditDescriptionPopupComponent
              photoDescription={photoDescription}
              image={image}
              setIsEditDescription={setIsEditDescription}
            />
          )}
          <section className="details">
            <article className="details__container">
              <img className="details__container__img" src={image.urls.regular} alt={image.alt_description} />
            </article>
            <article className="details__info">
              {photoDescription && <section className="details__info__description">
                <p className="details__info__description__text">{photoDescription}</p>
              </section>}
              <section className="details__info__data">
                <div className="details__info__data__item"><p>Downloads</p> <span>{image.downloads}</span></div>
                <div className="details__info__data__item"><p>Likes</p> <span>{image.likes}</span></div>
                <div className="details__info__data__item"><p>Views</p> <span>{image.views}</span></div>
                <div className="details__info__data__item"><p>Height</p> <span>{image.height}</span></div>
                <div className="details__info__data__item"><p>Width</p> <span>{image.width}</span></div>
              </section>
              <section className="details__info__actions">
                {isPhotoFav && (
                  <button
                    className="details__info__actions__button"
                    onClick={() => setIsEditDescription(true)}
                  >
                    <img src={editIcon} alt="edit icon" className="details__info__actions__button__img" />
                    <span className="details__info__actions__button__text">Editar</span>  
                  </button>
                )}
                <button
                  className={isPhotoFav ? "details__info__actions__button --saved" : "details__info__actions__button"}
                  onClick={(event) => handleToggleFav(event, image)}
                >
                  <img src={isPhotoFav ? saveIconGreen : saveIconBlack} alt="save icon" className="details__info__actions__button__img" />
                  <span className="details__info__actions__button__text">Guardar</span>
                </button>
                <button
                  className="details__info__actions__button"
                  onClick={(event) => handleDownload(event, image.urls.raw)}
                >
                  <img src={downloadIcon} alt="download icon" className="details__info__actions__button__img" />
                  <span className="details__info__actions__button__text">Descargar</span>
                </button>
              </section>
            </article>
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
