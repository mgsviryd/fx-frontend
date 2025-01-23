import axios from 'axios'

const rest = axios.create({
    baseURL: import.meta.env.VITE_HOST_REST_URL + '/rest',
    timeout: 5000,
})

export default rest