import axios, {
  type AxiosRequestConfig,
  type Method,
  type AxiosResponse
} from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dev.api.sitblueprint.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
} satisfies AxiosRequestConfig)

const request = async (
  method: Method,
  url: string,
  params?: unknown
): Promise<AxiosResponse> => {
  return await apiClient.request({ method, url, params })
}

export default request
