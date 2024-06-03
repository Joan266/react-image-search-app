import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { NavComponent } from '../NavComponent/NavComponent.jsx';

import { FetchRandomThunk } from '../../slices/SearchSlice/searchThunk.js';
import { setFavs } from '../../slices/FavSlice.js';
export const LayoutComponent = () => {  
  const dispatch = useDispatch();
  const { data: favData } = useSelector((state) => state.fav);
  useEffect(() => {
      dispatch(FetchRandomThunk());
  }, []);
  useEffect(() => {
    const localStorageFavData = localStorage.getItem('favData');
    if (localStorageFavData) {
      dispatch(setFavs(JSON.parse(localStorageFavData)));
    }
    console.log("localStorage FavData")
  }, []);
  useEffect(() => {
    const handleWindowClose = () => {
      if(!favData) return
      localStorage.setItem('favData', JSON.stringify(favData));
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [favData]);
  
  return (
    <div className='LayoutComponent'>
      <NavComponent />
      <div id='main' className='main'>
        <Outlet/>
      </div>
    </div>
  );
};
