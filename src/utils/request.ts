import axios from 'axios'

const instance = axios.create({
    baseURL: '/s23',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance