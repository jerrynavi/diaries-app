import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import Swal from 'sweetalert2';

const http: AxiosInstance = axios.create({
  baseURL: 'https://diaries.app',
});

http.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error: AxiosError) => {
    const {
      response,
      request,
    }: { response?: AxiosResponse; request?: XMLHttpRequest } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        return Swal.fire({
          titleText: response.data?.data?.message ?? 'An error occurred',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Dismiss',
          icon: 'error',
          showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation',
          },
          hideClass: {
            popup: '',
            backdrop: '',
          },
        });
      }
    } else if (request) {
      return {
        message: 'Request failed. Please try again.',
        isError: true,
      };
    }
    return Promise.reject(error.response);
  }
);

export default http;
