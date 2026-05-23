import axios from 'axios';

// Vite uses import.meta.env for environment variables instead of process.env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Create a Poll
export const createPoll = async (pollData) => {
  const response = await api.post('/polls', pollData);
  return response.data;
};

// Get a Poll by ID
export const getPoll = async (id) => {
  const response = await api.get(`/polls/${id}`);
  return response.data;
};

export default api;