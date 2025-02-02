import sendRequest from './sendRequest';

const BASE_URL = '/api/characters';



export const getCharacters = async () => {
  const response = await sendRequest(`${BASE_URL}/`, 'GET');
  return response;
};

// export const getCharactersById = async (id) => {
//   const response = await sendRequest(`${BASE_URL}/${id}`, 'GET');
//   return response;
// };

