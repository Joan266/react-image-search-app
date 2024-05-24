import trashIcon from "../public/trash.svg";
import { addFav } from "../slices/favSlice";
import { useFavState } from "../hooks/useFavState";

export const FavCollectionComponent = () => {
  const { favData } = useFavState();

  return (
    <section className="gallery">
      {( favData && favData.length > 0) ? (
        favData.map((image) => (
          <figure className="gallery__item" key={image.id}>
            <div className="gallery__item__mask gallery__item__mask--top">
              <button className="gallery__item__mask__button" onClick={()=>addFav(image)}>
                <img src={trashIcon} alt="save icon" className="gallery__item__mask__button__img"></img>
              </button>
            </div>
            <div className="gallery__item__mask gallery__item__mask--bottom"></div>
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
