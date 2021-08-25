import { AxiosRequestConfig } from 'axios';

export function timeMessageObjCreate(message: string): AxiosRequestConfig {
  return { timeoutErrorMessage: message };
}
