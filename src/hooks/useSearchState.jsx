import { useSelector } from "react-redux";

export const useSearchState = () => {
  const { status, data, error } = useSelector((state) => state.search);
  return { searchData: data, searchStatus: status, searchError: error };
};