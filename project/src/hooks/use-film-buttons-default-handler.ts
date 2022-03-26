import { useCallback } from 'react';
import { api } from '../api/api';
import { ButtonType } from '../components/film-card-buttons/constants';
import { AppRoute } from '../utils/constants';
import { useFavorite } from './use-favorite';
import { useRedirect } from './use-redirect';

export const useFilmButtonsDefaultHandler = (id: number) : (type: ButtonType) => void => {
  const redirect = useRedirect();
  const isFavorite = useFavorite(id);
  const actionButtonClickHandler = useCallback((type: ButtonType) => {
    switch(type) {
      case ButtonType.Play:
        redirect(`${AppRoute.PlayerRoot}/${id}`);
        break;
      case ButtonType.MyList:
        api.setFavoriteStatus(id, !isFavorite);
        break;
      case ButtonType.AddReview:
        redirect(`${AppRoute.Films}/${id}/review`);
        break;
    }
  }, [id, isFavorite]);
  return actionButtonClickHandler;
};
