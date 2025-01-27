import axios from 'axios';

const API_URL = 'api/openai/';

export const generateNarative = (prompt, token) => {
    return axios.post(`$(API_URL)generate-narative`, {prompt}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};