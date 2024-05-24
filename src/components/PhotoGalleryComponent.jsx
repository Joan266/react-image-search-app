import { useEffect } from "react";
import { useSearchPhotos } from "../hooks/useSearchPhotos";
import downloadIcon from "../public/download.svg";
import saveIcon from "../public/save.svg";

export const PhotoGalleryComponent = () => {
  const { searchData, searchStatus, searchError } = useSearchPhotos();
  useEffect(()=>{
    console.log(searchData)
  },[searchData])
  return (
    <section className="gallery">
      {searchStatus === "pending" ? (
        <p>LOADING</p>
      ) : searchStatus === "rejected" ? (
        <p>{searchError}</p>
      ) : searchStatus === "fulfilled" ? (
        searchData.map((image) => (
          <figure className="gallery__item" key={image.id}>
            <div className="gallery__item__mask gallery__item__mask--top">
              <a className="gallery__item__mask__button" href={image.links.download}  >                                 
                 <img src={downloadIcon} alt="download icon" className="gallery__item__mask__button__img"></img>
              </a>
              <button className="gallery__item__mask__button">
                <img src={saveIcon} alt="save icon" className="gallery__item__mask__button__img"></img>
              </button>
            </div>
            <div className="gallery__item__mask gallery__item__mask--bottom"/>
            <img
              className="gallery__img"
              src={image.urls.small}
              alt={`Image ${image.id}`}
            />
          </figure>
        ))
      ) : null}
    </section>
  );
};
