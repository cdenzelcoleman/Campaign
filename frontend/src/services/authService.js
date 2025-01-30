import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export async function signUp(userData) {
  const response = await sendRequest(`${BASE_URL}/signup`, 'POST', userData);
  return response;
}

export async function logIn(credentials) {
  const response = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  return response; 
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }
    return payload.user;
  } catch (error) {
    console.error('Failed to parse token:', error);
    return null;
  }
}

export function updateUserProfile(userData) {
  return sendRequest(`${BASE_URL}/profile`, 'PATCH', userData, getToken());
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}