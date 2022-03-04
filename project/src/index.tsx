import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { films, promoFilm, reviews } from './mock/films';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App filmsGallery={films} promoFilm={promoFilm} reviews={reviews}/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
