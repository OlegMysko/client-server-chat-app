import axios, { AxiosError } from 'axios';


export const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
});


httpClient.interceptors.request.use(request => {




  return request;
});

httpClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  res => res.data,




);
