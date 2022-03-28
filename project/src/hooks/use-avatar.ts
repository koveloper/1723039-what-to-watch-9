import { useSelector } from 'react-redux';
import { State } from '../store/types';

export const useAvatar = (): string => {
  const {userData} = useSelector((state: State) => state.user);
  return userData ? userData.avatarUrl : '';
};
