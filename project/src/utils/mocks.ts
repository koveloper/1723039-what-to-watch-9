import fakerStatic from 'faker';
import { UserWithoutTokenType } from '../types/user-type';

export const createFakeUser = (): UserWithoutTokenType => ({
  avatarUrl: fakerStatic.internet.url(),
  id: fakerStatic.datatype.number(),
  email: fakerStatic.internet.email(),
  name: `${fakerStatic.name.firstName()} ${fakerStatic.name.lastName()}`,
});

export const createFakeFavoriteFilmsIdList = (): number[] => fakerStatic.datatype.array(fakerStatic.datatype.number(8)).map(
  (el) => fakerStatic.datatype.number(20),
).sort((a, b) => a - b).reduce((acc, el) => {
  if(acc.length === 0 || acc[acc.length - 1] !== el) {
    acc.push(el);
  }
  return acc;
}, [] as number[]);
