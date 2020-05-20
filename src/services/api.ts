import axios, { AxiosInstance, AxiosResponse } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'https://diaries.app',
});

httpClient.defaults.headers.post['Content-Type'] = 'application/json';

httpClient.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error) => {
    console.log('Error', error.message);
    return Promise.reject(error);
  }
);

export default httpClient;
