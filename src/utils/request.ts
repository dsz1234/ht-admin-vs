import axios from 'axios'

const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 30 * 1000,
  withCredentials: false,
  responseType: 'json',
  responseEncoding: 'utf8'
})

export default instance
