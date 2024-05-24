import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetStateData, getRandomUnsPhotos } from '../slices/searchSlice'; 

export const useSearchPhotos = () => {
  const { status, data, error } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/") {
      if (data.length !== 0) {dispatch(resetStateData());}
      dispatch(getRandomUnsPhotos());
    }
  }, [location]);
  useEffect(()=>{
    console.log(data)
  },[data])

  return { searchData: data, searchStatus: status, searchError: error };
};