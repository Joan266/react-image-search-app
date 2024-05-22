import { Link } from 'react-router-dom';

export const NavComponent = () => {

return(
  <nav className="nav">
    <article className="nav__logo">OxygenPhotos</article>
    <ul className='nav__list'>
      <li className='nav__list__option'><Link to="/">Inicio</Link></li>
      <li className='nav__list__option'><Link to="fav">Favoritos</Link></li>
    </ul>
  </nav>
)
};