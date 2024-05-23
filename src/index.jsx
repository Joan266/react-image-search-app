import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from './store'
import './styles/index.css';

// pages & components
import { HomePage } from './pages/HomePage.jsx';
import { FavPage } from './pages/FavPage';

import { LayoutComponent } from './components/LayoutComponent.jsx';

const app = ReactDOM.createRoot(document.getElementById('root'));
app.render(
  <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutComponent />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/fav" element={<FavPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
);