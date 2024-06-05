import { useEffect, useState, useRef } from 'react';
import { GalleryCardComponent } from "../GalleryCardComponent/GalleryCardComponent.jsx";
import "./PhotoGalleryComponent.css";
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export const PhotoGalleryComponent = ({ data, status, error }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (status === 'fulfilled') {
      setImages(data);
      console.log(data)
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
  }, [status, data, error]);



  return (
    <section className="gallery">
      { images.length > 0 && 
          images.map((image,index) => <GalleryCardComponent image={image} key={`${image.id}${index}`} />)
       }
       {status === "pending" && 
        <div className="simple-spinner">
          <span></span>
        </div>}
    </section>
  );
};


