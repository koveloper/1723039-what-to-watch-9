import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { films, promoFilm, reviews } from './mock/films';
import App from './pages/app/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App filmsGallery={films} promoFilm={promoFilm} reviews={reviews}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
