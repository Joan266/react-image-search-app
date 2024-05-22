import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages & components
import { Homepage } from './pages/Homepage';
import { NavComponent } from './components/NavComponent.jsx';
import { FooterComponent } from './components/FooterComponent.jsx';

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <NavComponent />
      <div id='main' className='main'>
        {children}
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
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/homepage" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
