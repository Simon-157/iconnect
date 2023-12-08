import axios from 'axios';

const baseUrl = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API
  : import.meta.env.VITE_DEV_API;

const api = axios.create({
  baseUrl,
  withCredentials: true,
});

export { api, baseUrl};
