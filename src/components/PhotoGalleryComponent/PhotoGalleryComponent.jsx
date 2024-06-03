import { useSelector } from "react-redux";
import { GalleryCardComponent } from "../GalleryCardComponent/GalleryCardComponent.jsx";
import "./PhotoGalleryComponent.css"
export const PhotoGalleryComponent = () => {
  const { randomData, status: searchStatus, error: searchError } = useSelector((state) => state.search);

  return (
    <section className="gallery">
      {searchStatus === "pending" ? (
        <p>LOADING</p>
      ) : searchStatus === "rejected" ? (
        <p>{searchError}</p>
      ) : searchStatus === "fulfilled" && randomData && randomData.length > 0 ? (
        randomData.map((image) => (
          <GalleryCardComponent image={image} key={image.id}/>
        ))
      ) : null}
    </section>
  );
};
