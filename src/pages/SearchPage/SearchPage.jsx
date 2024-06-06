import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { FetchSearchThunk } from "../../slices/SearchSlice/searchThunk.js";
import { FetchRandomThunk } from "../../slices/RandomSlice/randomThunk.js";
import { GalleryCardComponent } from "../../components/GalleryCardComponent/GalleryCardComponent.jsx";
import "./SearchPage.css";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  const search = useSelector((state) => state.search);
  const random = useSelector((state) => state.random);
  const { status, error, data } = query ? search : random;

  const searchGalleryRef = useRef(null);
  const [images, setImages] = useState([]);


  useEffect(() => {
    if (status === 'idle') {
      if (query) {
        dispatch(FetchSearchThunk({ page: 1, count: 16 ,query }));
      } else {
        dispatch(FetchRandomThunk({ page: 1, count: 16 }));
      }
    } else if (status === 'fulfilled') {
      setImages(data);
    } else if (status === 'rejected') {
      console.log(error);
      toast.error('API request limit reached, try searching for photos again in 1 hour', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [status]);

  useEffect(() => {
    const resizeAllMasonryItems = () => {
      const grid = searchGalleryRef.current;
      if (!grid) return;

      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const columnWidth = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ')[0]);

      images.forEach(image => {
        const item = document.getElementById(image.id);
        if (item) {
          const imageHeight = (columnWidth) * image.height / image.width;
          const rowSpan = Math.ceil((imageHeight + rowGap) / (rowHeight + rowGap));
          item.style.gridRowEnd = `span ${rowSpan}`;
        }
      });
    };

    resizeAllMasonryItems();
    window.addEventListener('resize', resizeAllMasonryItems);

    return () => {
      window.removeEventListener('resize', resizeAllMasonryItems);
    };
  }, [images]);

  return (
    <div className="search">
      <section className="search__header">
        <h1 className="search__header__title">Fotos gratis {query ? `de ${query}` : "aleatorias"}</h1>
      </section>
      <section className="home__chips-container">
        {/* Aquí puedes agregar contenido si lo necesitas */}
      </section>
      <section className="search__gallery" ref={searchGalleryRef}>
        {status === "pending" && (
          <div className="simple-spinner">
            <span></span>
          </div>
        )}
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <GalleryCardComponent image={image} key={`${image.id}${index}`} />
          ))
        ) : (
          status === 'fulfilled' && <p>No se encontraron imágenes.</p>
        )}
      </section>
    </div>
  );
};
