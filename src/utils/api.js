import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({ baseURL });

const retryRequest = async (apiCall, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      throw error;
    }
  }
};

export const getProjects = () => retryRequest(() => api.get('/projects'));
export const getCategories = () => retryRequest(() => api.get('/category'));
