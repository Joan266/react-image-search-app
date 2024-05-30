import { useContext } from 'react';
import { WindowWidthContext } from '../context/WindowWidthContext';

export const useWindowWidthContext = () => {
  return useContext(WindowWidthContext);
};