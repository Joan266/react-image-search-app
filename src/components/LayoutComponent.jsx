import { NavComponent } from './NavComponent.jsx';
import { FooterComponent } from './FooterComponent.jsx';
import { Outlet } from 'react-router-dom';

export const LayoutComponent = () => {
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