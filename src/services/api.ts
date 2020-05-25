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
        showAlert(response.data?.data?.message);
        return null;
      }
    } else if (request) {
      showAlert('Request failed. Please try again.');
      return null;
    }
    return Promise.reject(error);
  }
);

const showAlert = (titleText = 'An error occurred.') => {
  Swal.fire({
    titleText,
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
};

export default http;
