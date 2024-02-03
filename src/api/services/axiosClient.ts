import axios from 'axios';

const baseURL = 'http://3.95.0.99:3001/api/v1'

const axiosInstance = axios.create({
    baseURL,
})


export default axiosInstance