import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useSearchState = () => {
  const { status, data, error } = useSelector((state) => state.search);
  useEffect(()=>{
    console.log(data)
  },[data])

  return { searchData: data, searchStatus: status, searchError: error };
};