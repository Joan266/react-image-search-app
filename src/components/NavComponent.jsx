import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBarComponent } from './SearchBarComponent';
import { useWindowWidthContext } from '../hooks/useWindowWidthContext';

export const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const windowWidth = useWindowWidthContext();
  const isHomePage = location.pathname === '/';

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
    <nav className={`nav ${(isScrolled && isHomePage) ? 'nav--regular' : 'nav--top-home'}`}>
      <article className="nav__logo">
        <Link to="/">{windowWidth >= 1200 ? 'OxygenPhotos' : 'OP'}</Link>
      </article>
      <div className="nav__search-bar-container">
        <SearchBarComponent />
      </div>
      <div className="nav__fav-link">
        <Link to="/fav">Favoritos</Link>
      </div>
    </nav>
  );
};
