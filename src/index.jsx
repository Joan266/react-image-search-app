import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from './store'
import './index.css';

// pages & components
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { FavPage } from './pages/FavPage/FavPage.jsx';
import { SearchPage } from './pages/SearchPage/SearchPage.jsx';
import { PhotoPage } from './pages/PhotoPage/PhotoPage.jsx';
import { LayoutComponent } from './components/LayoutComponent/LayoutComponent.jsx';

const app = ReactDOM.createRoot(document.getElementById('root'));
app.render(
  <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutComponent />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/fav" element={<FavPage/>} />
            <Route path="/search/:query" element={<SearchPage/>} />
            <Route path="/photo/:id" element={<PhotoPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
);
