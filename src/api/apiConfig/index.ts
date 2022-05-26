import axios from 'axios'

export const apiConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,
    },
})
