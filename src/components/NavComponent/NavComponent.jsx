import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBarComponent } from '../SearchBarComponent/SearchBarComponent.jsx';
import "./NavComponent.css"
export const NavComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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
    <nav className={`nav ${(isScrolled && isHomePage) ? 'nav--regular' : (!isScrolled && isHomePage) ? 'nav--top-home' :'nav--regular'}`}>
      <article className="nav__logo">
        <Link to="/"><span className="nav__logo nav__logo-long">OxygenPhotos</span><span className="nav__logo nav__logo--sort">OP</span></Link>
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
