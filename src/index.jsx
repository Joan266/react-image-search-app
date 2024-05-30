import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { WindowWidthProvider } from './context/WindowWidthContext.jsx';
import { store } from './store'
import './styles/index.css';

// pages & components
import { HomePage } from './pages/HomePage.jsx';
import { FavPage } from './pages/FavPage';
import { SearchPage } from './pages/SearchPage.jsx';
import { PhotoPage } from './pages/PhotoPage.jsx';
import { LayoutComponent } from './components/LayoutComponent.jsx';

const app = ReactDOM.createRoot(document.getElementById('root'));
app.render(
  <Provider store={store}>
    <WindowWidthProvider>
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
    </WindowWidthProvider>
  </Provider>
);
