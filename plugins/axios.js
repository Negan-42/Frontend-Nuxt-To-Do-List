import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.104:3000/api/', // Change this to your Django API base URL
});

export default instance;
