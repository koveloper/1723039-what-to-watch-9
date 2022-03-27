import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { api, createAPI } from './api';
import { State, Store } from '../store/types';
import { Action } from '@reduxjs/toolkit';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { APIRoute } from './constants';
import { changeFavoriteFilmState, setAuthStatus, setFavoriteFilms, setUserData } from '../store/user-process/user-process';
import { getNetworkInstance } from './network';
import { LoginData } from '../types/login-data';
import { createFakeComment, createFakeComments, createFakeEmail, createFakeFilmData, createFakeFilmFullData, createFakeFilms, createFakePassword, createFakeUserResponse, createInitialState } from '../utils/mocks';
import { setFilms, setFullDataFilm, setPromoFilm, updateComments } from '../store/films-process/films-process';
import { FilmData, FilmFullData, Films } from '../types/film-data-type';
import { setAppError, setRedirect } from '../store/service-process/service-process';
import { AppRoute } from '../utils/constants';

describe('API functions', () => {
  //create default network instance
  const network = getNetworkInstance();
  //wrap network unit to mock API for simulate server answers
  const networkMockWrapper = new MockAdapter(network);
  const middlewares = [thunk.withExtraArgument(network)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
  //create state initial state
  const initialState:State = createInitialState();

  it('should authorization status is «auth» when server return 200', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    networkMockWrapper
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await mockApi.checkAuth();

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setAuthStatus.toString());
  });

  it('should dispatch loginAction and expect auth status and userData when POST /login', async () => {
    const fakeUser:LoginData = {login: createFakeEmail(), password: createFakePassword()};
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeUserResponse = Object.assign(createFakeUserResponse(), {email: fakeUser.login});
    //immitate answer on POST to login URL
    networkMockWrapper
      .onPost(APIRoute.Login)
      .reply(200, fakeUserResponse);
    //replace storage with jest spy function
    Storage.prototype.setItem = jest.fn();
    //call API method
    await mockApi.login(fakeUser);
    //analize store actions queue
    const authAction = store.getActions().find((action) => action.type === setAuthStatus.toString());
    const userDataAction = store.getActions().find((action) => action.type === setUserData.toString());
    //check for actions in queue
    expect(authAction).not.toBe(undefined);
    expect(userDataAction).not.toBe(undefined);
    //check for action contains auth state
    expect(authAction).toMatchObject({payload: 'Authorized'});
    //check for action contains user data
    expect(userDataAction).toMatchObject({payload: fakeUserResponse});
    //check conditions on storage
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch', fakeUserResponse.token);
  });

  it('should dispatch loginAction with UnAuthorized status when DELETE /logout', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //immitate answer on POST to login URL
    networkMockWrapper
      .onDelete(APIRoute.Logout)
      .reply(204);
    //call API method
    await mockApi.logout();
    //analize store actions queue
    const authAction = store.getActions().find((action) => action.type === setAuthStatus.toString());
    const userDataAction = store.getActions().find((action) => action.type === setUserData.toString());
    //check for actions in queue
    expect(authAction).not.toBe(undefined);
    expect(userDataAction).not.toBe(undefined);
    //check for action contains auth state
    expect(authAction).toMatchObject({payload: 'UnAuthorized'});
    //check for action contains user data
    expect(userDataAction).toMatchObject({payload: null});
  });

  it('should dispatch setFilms action with films data', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeFilmsResponse:Films = createFakeFilms();
    //immitate answer on POST to login URL
    networkMockWrapper
      .onGet(APIRoute.Films)
      .reply(200, fakeFilmsResponse);
    //call API method
    await mockApi.fetchFilms();
    //analize store actions queue
    const filmsAction = store.getActions().find((action) => action.type === setFilms.toString());
    //check for action in queue
    expect(filmsAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(filmsAction).toMatchObject({payload: fakeFilmsResponse});
  });

  it('should dispatch setPromoFilm action with promoFilm data', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeFilmResponse:FilmData = createFakeFilmData();
    //immitate answer on POST to login URL
    networkMockWrapper
      .onGet(APIRoute.PromoFilm)
      .reply(200, fakeFilmResponse);
    //call API method
    await mockApi.fetchPromoFilm();
    //analize store actions queue
    const filmAction = store.getActions().find((action) => action.type === setPromoFilm.toString());
    //check for action in queue
    expect(filmAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(filmAction).toMatchObject({payload: fakeFilmResponse});
  });

  it('should dispatch setFullDataFilm action with film full data', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeFilmResponse:FilmFullData = createFakeFilmFullData();
    //immitate answer on POST to login URL
    networkMockWrapper
      .onGet(APIRoute.Film(fakeFilmResponse.id))
      .reply(200, fakeFilmResponse.data);
    networkMockWrapper
      .onGet(APIRoute.SimilarFilms(fakeFilmResponse.id))
      .reply(200, fakeFilmResponse.similar);
    networkMockWrapper
      .onGet(APIRoute.Comments(fakeFilmResponse.id))
      .reply(200, fakeFilmResponse.comments);
    //call API method
    await mockApi.fetchFilmFullData(fakeFilmResponse.id);
    //analize store actions queue
    const fullFilmAction = store.getActions().find((action) => action.type === setFullDataFilm.toString());
    //check for action in queue
    expect(fullFilmAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(fullFilmAction).toMatchObject({payload: fakeFilmResponse});
  });

  it('should dispatch setRedirect to 404 on uncorrect film id', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    const fakeFilmId = 8912983712;

    networkMockWrapper
      .onGet(APIRoute.Film(fakeFilmId))
      .reply(404);
    networkMockWrapper
      .onGet(APIRoute.SimilarFilms(fakeFilmId))
      .reply(404);
    networkMockWrapper
      .onGet(APIRoute.Comments(fakeFilmId))
      .reply(404);
    //call API method
    await mockApi.fetchFilmFullData(fakeFilmId);
    //analize store actions queue
    const redirectAction = store.getActions().find((action) => action.type === setRedirect.toString());
    //check for action in queue
    expect(redirectAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(redirectAction).toMatchObject({payload: AppRoute.Err404});
  });

  it('should dispatch updateComments with comments data and setRedirect to film page', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeComment = createFakeComment();
    const fakeCommentsResponse = createFakeComments();
    //
    networkMockWrapper
      .onPost(APIRoute.Comments(fakeComment.id))
      .reply(200, fakeCommentsResponse);

    //call API method
    await mockApi.postReview({id: fakeComment.id, comment: fakeComment.comment, rating: fakeComment.rating});
    //analize store actions queue
    const commentsAction = store.getActions().find((action) => action.type === updateComments.toString());
    //analize store actions queue
    const redirectAction = store.getActions().find((action) => action.type === setRedirect.toString());
    //check for action in queue
    expect(commentsAction).not.toBe(undefined);
    expect(redirectAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(commentsAction).toMatchObject({payload: {
      id: fakeComment.id,
      comments: fakeCommentsResponse,
    }});
    expect(redirectAction).toMatchObject({payload: `${AppRoute.Films}/${fakeComment.id}`});
  });

  it('should dispatch setAppError with type PostReviewError', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeComment = createFakeComment();
    networkMockWrapper
      .onPost(APIRoute.Comments(fakeComment.id))
      .reply(404);

    //call login request threw mocked API
    await mockApi.postReview({id: fakeComment.id, comment: fakeComment.comment, rating: fakeComment.rating});
    //analize store actions queue
    const setAppErr = store.getActions().find((action) => action.type === setAppError.toString());
    //check for action in queue
    expect(setAppErr).not.toBe(undefined);
  });

  it('should dispatch setFavoriteFilms with favor films id array on favorite films request', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeFilmsResponse = createFakeFilms(7);
    //
    networkMockWrapper
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, fakeFilmsResponse);

    //call login request threw mocked API
    await mockApi.fetchFavoriteFilms();
    //analize store actions queue
    const favorFilmsAction = store.getActions().find((action) => action.type === setFavoriteFilms.toString());
    //check for action in queue
    expect(favorFilmsAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(favorFilmsAction).toMatchObject({payload: fakeFilmsResponse.map((film) => film.id)});
  });

  it('should dispatch changeFavoriteFilmState with film data', async () => {
    //create mock store instance
    const store = mockStore(initialState);
    //create mock API instance with mocked store and mocked network
    const mockApi = createAPI(store as Store, network);
    //
    const fakeFilmResponse = createFakeFilmData();
    //
    networkMockWrapper
      .onPost(APIRoute.SetFavoriteFilm(fakeFilmResponse.id, fakeFilmResponse.isFavorite))
      .reply(200, fakeFilmResponse);
    //call login request threw mocked API
    await mockApi.setFavoriteStatus(fakeFilmResponse.id, fakeFilmResponse.isFavorite);
    //analize store actions queue
    const filmDataAction = store.getActions().find((action) => action.type === changeFavoriteFilmState.toString());
    //check for action in queue
    expect(filmDataAction).not.toBe(undefined);
    //check for action contains correct payload
    expect(filmDataAction).toMatchObject({payload: fakeFilmResponse});
  });
});
