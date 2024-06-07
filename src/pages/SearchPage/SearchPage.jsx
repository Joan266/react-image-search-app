import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { FetchSearchThunk } from "../../slices/SearchSlice/searchThunk.js";
import { FetchRandomThunk } from "../../slices/RandomSlice/randomThunk.js";
import { resetRandomStateData } from "../../slices/RandomSlice/RandomSlice.js";
import { resetSearchStateData } from "../../slices/SearchSlice/SearchSlice.js";
import { GalleryCardComponent } from "../../components/GalleryCardComponent/GalleryCardComponent.jsx";
import "./SearchPage.css";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { query, page } = useParams();

  const search = useSelector((state) => state.search);
  const random = useSelector((state) => state.random);
  const { status, error, data,  total, total_pages, count} = query ? search : random;

  const searchGalleryRef = useRef(null);
  const [images, setImages] = useState([]);
  const [ pageValue, setPageValue ] = useState(page);

  const handleChangePage = () => {

  };
  
  const handleGoNextPage = () => {

  };
  const handleGoPreviousPage = () => {

  };
 useEffect(()=>{
    if (query) {
      dispatch(resetSearchStateData())
      dispatch(FetchSearchThunk({ query, page, count }));
    }
    if (!query) {
      dispatch(resetRandomStateData());
      dispatch(FetchRandomThunk({ page, count }));
    }
 },[query,dispatch,count,page])

  useEffect(() => {
    if (status === 'fulfilled') {
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
      <section className="search__pagination search__pagination--big">
        <span className="search__pagination__info">{`1-${count} de ${total} imágenes`}</span>
        <div className="search__pagination__next-page">
          <button className="search__pagination__next-page__button" onClick={handleGoPreviousPage}>Página siguiente</button>
        </div>
        <div className="search__pagination__controler">
          <button className="search__pagination__controler__button">{'<'}</button>
          <form onSubmit={handleChangePage} className="search__pagination__controler__form">
            <input type="number" value={page} className="search__pagination__controler__form__input">
            </input>
            <span className="search__pagination__controler__form__span">{`/ ${total_pages}`}</span>
          </form>    
          <button className="search__pagination__controler__button" onClick={handleGoNextPage}>{'>'}</button>
        </div>
      </section>
      <section className="search__pagination">
        <div className="search__pagination__next-page">
          <button className="search__pagination__next-page__button" onClick={handleGoPreviousPage}>Página siguiente</button>
        </div>
        <div className="search__pagination__bottom">
          <span className="search__pagination__info">{`1-${count} de ${total} imágenes`}</span>
          <div className="search__pagination__controler">
            <button className="search__pagination__controler__button">{'<'}</button>
            <form onSubmit={handleChangePage} className="search__pagination__controler__form">
              <input type="number" value={page} className="search__pagination__controler__form__input">
              </input>
              <span className="search__pagination__controler__form__span">{`/ ${total_pages}`}</span>
            </form>
            <button className="search__pagination__controler__button" onClick={handleGoNextPage}>{'>'}</button>
          </div>
        </div>
      </section>
    </div>
  );
};
