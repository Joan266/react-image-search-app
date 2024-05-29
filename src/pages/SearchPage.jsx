import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchUnsPhotosByQuery } from "../slices/searchSlice";
import { PhotoGalleryComponent } from "../components/PhotoGalleryComponent";
import { ChipsComponent } from "../components/ChipsComponent";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const searchWords = [
    "naturaleza", "paisaje", "ciudad", "viaje", "playa", "montaña", 
    "arquitectura", "urbano", "arte", "colorido", "abstracto", 
    "moderno", "antiguo", "fotografía", "textura", "animales", 
    "aventura", "cultura", "comida", "tecnología", "negocios", 
    "creativo", "inspiración", "construcción", "patrón", "minimalista", 
    "cielo", "agua", "reflejo", "luces", "sombras", "movimiento", 
    "tranquilidad", "energía", "pasión", "alegría", "emoción", 
    "misterio", "diseño", "celebración", "relajación", "innovación", 
    "equilibrio", "contraste"
  ];
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
      <section className="home__chips-container">
        <ChipsComponent searchWords={searchWords}/>
      </section>
      <PhotoGalleryComponent />
    </div>
  );
};