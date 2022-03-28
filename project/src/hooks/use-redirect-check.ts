import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRedirect } from '../store/service-process/service-process';
import { State } from '../store/types';

export const useRedirectCheck = ():boolean => {
  const navigate = useNavigate();
  const store = useStore();
  const { redirect } = useSelector((state: State) => state.service);
  useEffect(() => {
    if(!redirect) {
      return;
    }
    store.dispatch(setRedirect(null));
    navigate(redirect);
  }, [redirect]);
  return !!redirect;
};
