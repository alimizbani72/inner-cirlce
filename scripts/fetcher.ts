import { signOut } from '@/auth';
import { MINECRAFT_ENDPOINT } from '@/consts';
import { getToken } from '@/utils/getToken';
import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const AXIOS_INSTANCE = Axios.create({
  baseURL: MINECRAFT_ENDPOINT,
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut();
    }
    return Promise.reject(error);
  }
);

interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void;
}

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const accessToken = getToken();

  // Add timestamp to prevent caching of sensitive requests
  const timestamp = new Date().getTime();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Timestamp': timestamp,
    },
    cancelToken: source.token,
  }).then(({ data }) => data) as CancellablePromise<T>;

  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
