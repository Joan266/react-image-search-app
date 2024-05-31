import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { NavComponent } from '../NavComponent/NavComponent.jsx';

import { resetSearchStateData, getRandomUnsPhotos } from '../../slices/searchSlice'; 
import { setFavs } from '../../slices/favSlice.js';
export const LayoutComponent = () => {  
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: searchData } = useSelector((state) => state.search);
  const { data: favData } = useSelector((state) => state.fav);

  useEffect(() => {
    if(location.pathname === "/") {
      if (searchData.length !== 0) {dispatch(resetSearchStateData());}
      dispatch(getRandomUnsPhotos());
    }
  }, [location]);
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
