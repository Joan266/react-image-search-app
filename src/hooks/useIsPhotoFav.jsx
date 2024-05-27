import { useState, useEffect } from "react";
import { useFavState } from "./useFavState";
import { addFav,deleteFav } from "../slices/favSlice";
import { useDispatch } from "react-redux";

export const useIsPhotoFav = (image) => {
  const [isPhotoFav, setIsPhotoFav] = useState(false);
  const { favData, favStatus, favError } = useFavState();
  const [ photoDescription, setPhotoDescription ] = useState(null);
  const dispatch = useDispatch();

  const handleToggleFav = (event) => {
    event.stopPropagation();
    setIsPhotoFav(!isPhotoFav);
    if(isPhotoFav) {
      dispatch(deleteFav(image));
    } else {
      dispatch(addFav(image));
    }
  };
  useEffect(() => {
    if (favData && image) {
      const photoDataResult = favData.find(fav => fav.id === image.id);
      setIsPhotoFav(photoDataResult?true:false);
      setPhotoDescription(photoDataResult.description !== undefined && photoDataResult.description !== null ? photoDataResult.description : (image?.description ? image.description : image?.alt_description))
    }
    console.log(favData)
  }, [image.id, favData]);

  return { isPhotoFav, handleToggleFav, photoDescription }
}
