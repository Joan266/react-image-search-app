import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchApiPhotosByQuery } from "../slices/searchSlice";

export const useSearchPhotos = () => {
  const dispatch = useDispatch();
  
  const { status, data, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (status === "idle") {
      dispatch(searchApiPhotosByQuery());
    } 
  }, [status, dispatch]);

  return { searchData: data, searchStatus: status, searchError: error};
};