import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { api } from './api/api';

api.fetchFilms();
api.fetchPromoFilm();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
