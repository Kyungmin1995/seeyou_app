import axios from 'axios';
import {getStorage, setStorage} from './storage';

const API = axios.create({
  baseURL: 'http://52.79.176.159:9001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
API.interceptors.request.use(
  async config => {
    try {
      const accessToken = await getStorage('access_token');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken.access_token}`;
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }
    return config;
  },
  error => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response) {
      console.log('Response status:', error.response.status);

      if (error.response.status === 401) {
        try {
          const {refresh_token} = await getStorage('refresh_token');
          console.log('리프레쉬토큰', refresh_token);

          if (!refresh_token) {
            console.error('No refresh token found');
            return Promise.reject(error);
          }

          const response = await axios.post(
            'http://52.79.176.159:9001/api/v1/reissue',
            {refreshToken: refresh_token},
          );

          console.log('Token reissue response:', response);

          const newAccessToken = response.data.accessToken;
          await setStorage('access_token', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return API(originalRequest);
        } catch (err) {
          console.error('Error during token reissue:', err);
          return Promise.reject(err);
        }
      }
    } else {
      console.error('Error response is undefined:', error);
    }

    return Promise.reject(error);
  },
);

export default API;
