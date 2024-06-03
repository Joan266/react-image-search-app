import { GalleryCardComponent } from "../GalleryCardComponent/GalleryCardComponent.jsx";
import "./PhotoGalleryComponent.css"
export const PhotoGalleryComponent = ({data, status, error}) => {
  return (
    <section className="gallery">
      {status === "pending" ? (
        <p>LOADING</p>
      ) : status === "rejected" ? (
        <p>{error}</p>
      ) : status === "fulfilled" && data && data.length > 0 ? (
        data.map((image) => (
          <GalleryCardComponent image={image} key={image.id}/>
        ))
      ) : null}
    </section>
  );
};
