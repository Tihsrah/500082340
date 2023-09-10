import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your server's URL
const CLIENT_ID = 'e0759e1d-5f25-467f-be6e-2822aadb43bb';
const CLIENT_SECRET = 'fHRhEbbvlLkCbvOl';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with your actual token

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const fetchTrains = () => {
  return api.get('/api/trains');
};

// Add other API calls as needed

export default api;