const USER_KEY = 'pollster_username';

export const getUserName = () => {
  return localStorage.getItem(USER_KEY);
};

export const setUserName = (name) => {
  localStorage.setItem(USER_KEY, name);
};

export const clearUserName = () => {
  localStorage.removeItem(USER_KEY);
};