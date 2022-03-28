import { createFakeFilmData, createFakeFilmFullData, createFakeFilms } from '../../utils/mocks';
import { FilmsState } from '../types';
import { filmsProcess, setFilms, setFullDataFilm, setPromoFilm } from './films-process';

describe('Reducer: filmsProcess', () => {
  const initialState:FilmsState = {
    all: null,
    promoFilm: null,
    fullDataFilms: {},
  };
  it('check for initial state on any non data call', () => {
    expect(filmsProcess.reducer(void 0, {type: 'some dummy action'}))
      .toEqual(initialState);
  });
  describe('films tree', () => {
    const fakeFilms = createFakeFilms();
    it('on setFilms action', () => {
      expect(filmsProcess.reducer(initialState, setFilms(fakeFilms)))
        .toEqual(Object.assign({}, initialState, {all: fakeFilms}));
    });
  });
  describe('promoFilm tree', () => {
    const fakeFilm = createFakeFilmData();
    it('on setPromoFilm action', () => {
      expect(filmsProcess.reducer(initialState, setPromoFilm(fakeFilm)))
        .toEqual(Object.assign({}, initialState, {promoFilm: fakeFilm}));
    });
  });
  describe('fullDataFilms tree', () => {
    const fakeFilm = createFakeFilmFullData();
    const state = Object.assign({}, initialState);
    it('on setPromoFilm action', () => {
      expect(filmsProcess.reducer(state, setFullDataFilm(fakeFilm)))
        .toEqual(Object.assign(state, {fullDataFilms: {[fakeFilm.id]: fakeFilm}}));
    });
    const anotherFakeFilm = createFakeFilmFullData();
    it('on another setPromoFilm action', () => {
      expect(filmsProcess.reducer(state, setFullDataFilm(anotherFakeFilm)))
        .toEqual(Object.assign(state, {fullDataFilms: Object.assign(state.fullDataFilms, {[anotherFakeFilm.id]: anotherFakeFilm})}));
    });
  });
});
