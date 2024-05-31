import { useSelector } from "react-redux";
import { GalleryCardComponent } from "../GalleryCardComponent/GalleryCardComponent.jsx";
import "./PhotoGalleryComponent.css"
export const PhotoGalleryComponent = () => {
  const { data: searchData, status: searchStatus, error: searchError } = useSelector((state) => state.search);

  return (
    <section className="gallery">
      {searchStatus === "pending" ? (
        <p>LOADING</p>
      ) : searchStatus === "rejected" ? (
        <p>{searchError}</p>
      ) : searchStatus === "fulfilled" && searchData && searchData.length > 0 ? (
        searchData.map((image) => (
          <GalleryCardComponent image={image} key={image.id}/>
        ))
      ) : null}
    </section>
  );
};
