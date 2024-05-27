import { useSelector } from "react-redux";

export const useFavState = () => {
  const { status, data, error } = useSelector((state) => state.fav);
  return { favData: data, favStatus: status, favError: error };
};