import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBarComponent } from '../SearchBarComponent/SearchBarComponent.jsx';
import "./NavComponent.css"
export const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSearchPage = location.pathname.startsWith('/search');
  const isFavPage = location.pathname === '/fav';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav ${(isScrolled && isHomePage) ? 'nav--regular' : (!isScrolled && isHomePage) ? 'nav--top-home' : 'nav--regular'}`}>
      <div className="nav__logo">
        <Link to="/">
          <span className="nav__logo__text nav__logo__text--long">OxygenPhotos</span>
          <span className="nav__logo__text nav__logo__text--sort">OP</span>
        </Link>
      </div>
      <div className="nav__search-bar-container">
        <SearchBarComponent />
      </div>
      <div className="nav__container">
        <Link to="/">
          <div className={`nav__container__fav-link ${isHomePage ? 'nav__container__fav-link--active' : ''}`}>Inicio</div>
        </Link>
        <Link to="/search">
          <div className={`nav__container__fav-link ${isSearchPage ? 'nav__container__fav-link--active' : ''}`}>Explorar</div>
        </Link>
        <Link to="/fav">
          <div className={`nav__container__fav-link ${isFavPage ? 'nav__container__fav-link--active' : ''}`}>Favoritos</div>
        </Link>
      </div>
    </nav>
  );
};
