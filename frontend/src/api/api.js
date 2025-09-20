// add interceptors via axios
import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({

    // import from .env
    baseURL: import.meta.env.VITE_API_URL
})

// create interceptor
api.interceptors.request.use(

    (config) => {
        // get token from local storage
        const token = localStorage.getItem(ACCESS_TOKEN)

        // if the user has token
        if (token) {
            // set it to have authorization via bearer oken + header
            config.headers.Authorization = `Bearer ${token}`
        }       

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;