import { useState, useEffect } from "react";

import { useFavState } from "./useFavState";

export const useIsPhotoFav = (id) => {
  const [isPhotoFav, setIsPhotoFav] = useState(false);
  const { favData, favStatus, favError } = useFavState();

  useEffect(() => {
    console.log(favData, "get")
    if (favData && id) {
      const photoDataResult = favData.find(fav => fav.id === id);
      setIsPhotoFav(photoDataResult?true:false);
    }
  }, [id, favData]);

  return { isPhotoFav }
}
