import { useSearchState } from "../hooks/useSearchState";
import { GalleryCardComponent } from "./GalleryCardComponent";
export const PhotoGalleryComponent = () => {
  const { searchData, searchStatus, searchError } = useSearchState();

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
