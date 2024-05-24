import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchUnsPhotosByQuery } from "../slices/searchSlice";
import { PhotoGalleryComponent } from "../components/PhotoGalleryComponent";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      dispatch(searchUnsPhotosByQuery(query));
    } 
  }, [dispatch, query]);

  return (
    <div className="search">
      <section className="search__header">
        <h1 className="search__header__title">Fotos gratis de {query}</h1>
      </section>
      <PhotoGalleryComponent />
    </div>
  );
};