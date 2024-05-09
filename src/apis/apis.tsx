import axios from 'axios'
import { stringify } from 'qs'

export const flipitAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})
