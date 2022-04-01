import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { AppRoute, FilmCardButtonType } from '../utils/constants';
import { useFavorite } from './use-favorite';

export const useFilmButtonsDefaultHandler = (id: number) : (type: FilmCardButtonType) => void => {
  const navigate = useNavigate();
  const isFavorite = useFavorite(id);
  const actionButtonClickHandler = useCallback((type: FilmCardButtonType) => {
    switch(type) {
      case FilmCardButtonType.Play:
        navigate(`${AppRoute.PlayerRoot}/${id}`);
        break;
      case FilmCardButtonType.MyList:
        api.setFavoriteStatus(id, !isFavorite);
        break;
      case FilmCardButtonType.AddReview:
        navigate(`${AppRoute.Films}/${id}/review`);
        break;
    }
  }, [id, isFavorite]);
  return actionButtonClickHandler;
};
