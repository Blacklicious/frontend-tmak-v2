import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'process.env.NEXT_PUBLIC_API_URL/',  // Your API base URL
  withCredentials: true,  // Include credentials in requests
});

axiosInstance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;