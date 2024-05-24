import { PhotoGalleryComponent } from "../components/PhotoGalleryComponent"
import { SearchBarComponent } from "../components/SearchBarComponent"

export const HomePage = () => {  

  return (
    <div className="home">
      <section className="home__header">
        <div className="home__header__content">
          <h1 className="home__header__content__title">Increíbles Imágenes Gratis Para Descargar</h1>
          <p className="home__header__content__subtitle">Nuestro banco de imágenes tiene más de 1 millón de imágenes y videos compartidos por nuestra talentosa comunidad.</p>
          <div className="home__header__content__search-bar-container">
          <SearchBarComponent/>
          </div>
        </div>
      </section>
      <PhotoGalleryComponent/>
    </div>
  )
}
