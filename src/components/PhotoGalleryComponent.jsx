import { useSearchState } from "../hooks/useSearchState";
import downloadIcon from "../public/download.svg";
import saveIcon from "../public/save.svg";
import FileSaver from "file-saver";
import { addFav } from "../slices/favSlice";
import { useDispatch } from "react-redux";
export const PhotoGalleryComponent = () => {
  const { searchData, searchStatus, searchError } = useSearchState();
  const dispatch = useDispatch();
  const handleDownload = (image) => {
    FileSaver.saveAs(image.urls.raw, "oxygen-photo.jpg");
  };

  const handleAddFav = (image) => {
    dispatch(addFav(image));
  }
  return (
    <section className="gallery">
      {searchStatus === "pending" ? (
        <p>LOADING</p>
      ) : searchStatus === "rejected" ? (
        <p>{searchError}</p>
      ) : (searchStatus === "fulfilled" && searchData && searchData.length > 0) ? (
        searchData.map((image) => (
          <figure className="gallery__item" key={image.id}>
            <div className="gallery__item__mask gallery__item__mask--top">
              <button className="gallery__item__mask__button" onClick={()=>handleDownload(image)}>                                 
                 <img src={downloadIcon} alt="download icon" className="gallery__item__mask__button__img"></img>
              </button>
              <button className="gallery__item__mask__button" onClick={()=>handleAddFav(image)}>
                <img src={saveIcon} alt="save icon" className="gallery__item__mask__button__img"></img>
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
