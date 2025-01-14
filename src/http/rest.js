import axios from 'axios'

const rest = axios.create({
    baseURL: location.protocol + '//' + location.hostname + ':' + 8080 + '/rest',
    timeout: 5000,
})

export default rest