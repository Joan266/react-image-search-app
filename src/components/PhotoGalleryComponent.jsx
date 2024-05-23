import { useEffect } from "react";
import { useSearchPhotos } from "../hooks/useSearchPhotos";

export const PhotoGalleryComponent = () => {
  const { searchData, searchStatus, searchError } = useSearchPhotos();

  useEffect(() => {
    console.log(searchData, searchStatus, searchError);
  }, [searchData, searchStatus, searchError]);

  return (
    <div className="gallery">
      {searchStatus === "pending" ? (
        <p>LOADING</p>
      ) : searchStatus === "rejected" ? (
        <p>{searchError}</p>
      ) : searchStatus === "fulfilled" ? (
        searchData.map((image) => (
          <figure className="gallery__item" key={image.id}>
            <img
              className="gallery__img"
              src={image.urls.small}
              alt={`Image ${image.id}`}
            />
          </figure>
        ))
      ) : null}
    </div>
  );
};
