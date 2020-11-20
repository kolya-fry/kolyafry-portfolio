import axios from 'axios'
import qs from 'qs'

// const ApiHost = process.env.SERVER

const configure = {
  // baseURL: ApiHost,
  // headers: {},
  paramsSerializer: params => qs.stringify(params),
}

const api = axios.create(configure)

api.interceptors.response.use(
  response => Promise.resolve(response),
  error => Promise.reject(error.response),
)

export default api
