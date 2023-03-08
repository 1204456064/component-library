import axios from 'axios'

import { BASE_URL } from '@/constant/global';

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const get = service.get;
export { get }

export default service