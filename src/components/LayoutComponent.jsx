import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { NavComponent } from './NavComponent.jsx';
import { FooterComponent } from './FooterComponent.jsx';

import { resetSearchStateData, getRandomUnsPhotos } from '../slices/searchSlice'; 
import { useSearchState } from '../hooks/useSearchState.jsx';

export const LayoutComponent = () => {  
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchData, searchStatus, searchError } = useSearchState();

  useEffect(() => {
    if(location.pathname === "/") {
      if (searchData.length !== 0) {dispatch(resetSearchStateData());}
      dispatch(getRandomUnsPhotos());
    }
  }, [location]);
  
  return (
    <div className='LayoutComponent'>
      <NavComponent />
      <div id='main' className='main'>
        <Outlet/>
      </div>
      <FooterComponent/>
    </div>
  );
};