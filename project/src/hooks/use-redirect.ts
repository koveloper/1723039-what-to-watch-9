import { useStore } from 'react-redux';
import { setRedirect } from '../store/service-process/service-process';

type UseRedirectType = (addr: string) => void;

export const useRedirect = ():UseRedirectType => {
  const store = useStore();
  return (addr: string) => {
    store.dispatch(setRedirect(addr));
  };
};
