import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchState } from "../hooks/useSearchState";
export const PhotoPage = () => {
  const [photoData, setPhotoData] = useState(null);
  const { id } = useParams();
  const { searchData, searchStatus, searchError } = useSearchState();
  useEffect(() => {
    if (searchData && id) {
      const photoDataResult = searchData.find(fav => fav.id === id);
      setPhotoData(photoDataResult || null);
      console.log(photoDataResult);
    }
  }, [id, searchData]);

  return (
    <div className="photo-page">
      {photoData ? (
        <section className="photo-details">
          <article className="photo-details__img-container">
            <img className="photo-details__img-container__img" src={photoData.urls.regular} alt={photoData.alt_description} />
          </article>
          <article className="photo-details__info-container">
            <section className="photo-details__info-container__description">
              <p>{photoData.description || photoData.alt_description}</p>
              <button>Edit</button>
            </section>
            <section className="photo-details__info-container__data">
              <div className="photo-details__info-container__actions">
                <button>Guardar</button><button>Like</button>
              </div>
              <div className="photo-details__info-container__data__item"><p>Downloads:</p> <span>{photoData.downloads}</span></div>
              <div className="photo-details__info-container__data__item"><p>Likes:</p> <span>{photoData.likes}</span></div>
              <div className="photo-details__info-container__data__item"><p>Height:</p> <span>{photoData.height}</span></div>
              <div className="photo-details__info-container__data__item"><p>Width:</p> <span>{photoData.width}</span></div>
              <div className="photo-details__info-container__data__item"><p>Views:</p> <span>{photoData.views}</span></div>
            </section>
            <section className="photo-details__info-container__download">
              <button>Download</button>
            </section>
          </article>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
