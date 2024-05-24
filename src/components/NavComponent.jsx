import { Link } from 'react-router-dom';
import { SearchBarComponent } from './SearchBarComponent';

export const NavComponent = () => {
return(
  <nav className="nav">
    <article className="nav__logo"><Link to="/">OxygenPhotos</Link></article>
    <div className="nav__search-bar-container">
      <SearchBarComponent/>
    </div>
    <div className='nav__fav-link' >
      <Link to="/fav">Favoritos</Link> 
    </div>
  </nav>
)
};