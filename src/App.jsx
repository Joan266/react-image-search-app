import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// pages & components
import { HomePage } from './pages/HomePage.jsx';
import { FavPage } from './pages/FavPage';
import { NavComponent } from './components/NavComponent.jsx';
import { FooterComponent } from './components/FooterComponent.jsx';

const Layout = () => {
  return (
    <div className='layout'>
      <NavComponent />
      <div id='main' className='main'>
        <Outlet/>
      </div>
      <FooterComponent/>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/fav" element={<FavPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
