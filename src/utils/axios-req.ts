import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, Axios } from 'axios';

const instance = axios.create({
  baseURL: 'https://hn.nuxt.dev/api/hn',
  timeout: 10000,
});

// 1.Request Interceptor: Tự động dán Token vào trước khi gửi đi
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2.Response Interceptor: Gọt vỏ dữ liệu để Component dùng cho gọn
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
