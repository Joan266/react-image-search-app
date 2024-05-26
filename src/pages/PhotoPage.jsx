import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchState } from "../hooks/useSearchState";
export const PhotoPage = () => {
  const [photoData, setPhotoData] = useState(null);
  const { id } = useParams();
  const { searchData, searchStatus, searchError } = useSearchState();
  useEffect(() => {
    if (searchData && id) {
      const photoDataResult = searchData.find(fav => fav.id === id);
      setPhotoData(photoDataResult || null);
      console.log(photoDataResult);
    }
  }, [id, searchData]);

  return (
    <div className="photo-details">
      {photoData ? (
        <>
          <h1>{photoData.description || "Untitled"}</h1>
          <img src={photoData.urls.regular} alt={photoData.alt_description} />
          <p>Photographer: {photoData.user.name}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
