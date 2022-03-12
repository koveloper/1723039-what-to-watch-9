import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { api } from './api/api';
import { store } from './store';

api.fetchFilms();
api.fetchPromoFilm();
api.checkAuth();

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
