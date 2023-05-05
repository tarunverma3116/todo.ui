import axios from 'axios';
import { queryClient } from 'index';

const defaultOptions = {
  baseURL: process.env.REACT_APP_API_URL || 'http://13.127.162.64:8080/api/',
  // baseURL:process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
  },
};

// Create instance
export const api = axios.create(defaultOptions);

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token');
  token && (config.headers.Authorization = `Bearer ${token}`);

  return config;
}
);

api.interceptors.response.use((response) => {
  return response;
},
(err) => {
  //401 logic
  if(err?.response?.status === 401) {
    queryClient.setQueryData("user", undefined);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return Promise.reject(err);
}
);


export default api;