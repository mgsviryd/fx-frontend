import axios from 'axios'
export default {
    getHelloWorld: () => axios.get('/hello-world'),
}