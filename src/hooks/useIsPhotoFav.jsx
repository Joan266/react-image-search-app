import { useState, useEffect } from "react";
import { addFav,deleteFav } from "../slices/favSlice";
import { useDispatch, useSelector } from "react-redux";

export const useIsPhotoFav = (image) => {
  const [isPhotoFav, setIsPhotoFav] = useState(false);  
  const { data: favData } = useSelector((state) => state.fav);
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
      setIsPhotoFav(!!photoDataResult);
      setPhotoDescription(photoDataResult && photoDataResult.description !== undefined && photoDataResult.description !== null ? photoDataResult.description : (image?.description || image?.alt_description))}
  }, [image.id, favData]);

  return { isPhotoFav, handleToggleFav, photoDescription }
}
