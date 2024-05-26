import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useFavState = () => {
  const { status, data, error } = useSelector((state) => state.fav);
  useEffect(()=>{
    console.log(data)
  },[data])

  return { favData: data, favStatus: status, favError: error };
};