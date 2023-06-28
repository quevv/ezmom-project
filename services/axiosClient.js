import axios from 'axios';

const axiosClient = axios.create({baseURL: 'https://localhost:7168/api'});

export default axiosClient;