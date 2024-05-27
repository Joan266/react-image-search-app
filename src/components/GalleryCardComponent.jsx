import downloadIcon from "../public/download.svg";
import saveIcon from "../public/save.svg";
import FileSaver from "file-saver";
import { addFav,deleteFav } from "../slices/favSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsPhotoFav } from "../hooks/useIsPhotoFav";

export const PhotoCardComponent = (image) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPhotoFav } = useIsPhotoFav(image.id);

  const handleDownload = (event) => {
    event.stopPropagation();
    FileSaver.saveAs(image.urls.raw, "oxygen-photo.jpg");
  };

  const handleGalleryItemClick = () => {
    navigate(`/photo/${image.id}`);
  };

  const handleToggleFav = (event) => {
    event.stopPropagation();
    if(isPhotoFav) {
      dispatch(deleteFav(image));
    } else {
      dispatch(addFav(image));
    }
  };
  return(
    <figure className="gallery__item"  onClick={() => handleGalleryItemClick()}>
    <div className="gallery__item__mask gallery__item__mask--top">
      <button
        className="gallery__item__mask__button"
        onClick={(event) => handleDownload(event)}
      >
        <img src={downloadIcon} alt="download icon" className="gallery__item__mask__button__img" />
      </button>
      <button
        className="gallery__item__mask__button"
        onClick={(event) => handleToggleFav(event)}
      >
        <img src={saveIcon} alt="save icon" className="gallery__item__mask__button__img" />
      </button>
    </div>
    <div className="gallery__item__mask gallery__item__mask--bottom"></div>
    <img
      className="gallery__img"
      src={image.urls.small}
      alt={`Image ${image.id}`}
    />
  </figure>
  );
} 


