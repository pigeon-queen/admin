import {AxiosRequestConfig, AxiosPromise} from 'axios'

declare const request: (config: AxiosRequestConfig) => AxiosPromise;

export default request
