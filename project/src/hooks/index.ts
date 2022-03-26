import { useCallback, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { ButtonType } from '../components/film-card-buttons/constants';
import { store } from '../store';
import { setRedirect } from '../store/service-process/service-process';
import { AppDispatch, State } from '../store/types';
import { AppRoute } from '../utils/constants';
import { useFavorite } from './use-favorite';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

/////////////////////////////////////////
export const useButtonsDefaultHandler = (id: number) : (type: ButtonType) => void => {
  const navigate = useNavigate();
  const isFavorite = useFavorite(id);
  const actionButtonClickHandler = useCallback((type: ButtonType) => {
    switch(type) {
      case ButtonType.Play:
        navigate(AppRoute.Player.replace(':id', `${id}`));
        break;
      case ButtonType.MyList:
        api.setFavoriteStatus(id, !isFavorite);
        break;
      case ButtonType.AddReview:
        navigate('review');
        break;
    }
  }, [id, isFavorite]);
  return actionButtonClickHandler;
};

/////////////////////////////////////////


