const AUTH_TOKEN_KEY_NAME = 'what-to-watch';

export type Token = string;

const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const token = {
  get: getToken,
  save: saveToken,
  drop: dropToken,
};
