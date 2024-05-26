import trashIcon from "../public/trash.svg";
import { deleteFav } from "../slices/favSlice";
import { useFavState } from "../hooks/useFavState";
import { useDispatch } from "react-redux";
export const FavCollectionComponent = () => {
  const dispatch = useDispatch();
  const { favData } = useFavState();

  const handleRemoveFav = (image) => {
    dispatch(deleteFav(image));
  }

  return (
    <section className="gallery">
      {( favData && favData.length > 0) ? (
        favData.map((image) => (
          <figure className="gallery__item" key={image.id}>
            <div className="gallery__item__mask gallery__item__mask--top">
              <button className="gallery__item__mask__button" onClick={()=>handleRemoveFav(image)}>
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
