import axios from 'axios';
import authHeader from './auth.middleware';

class ConfigMiddleware {
    register() {
        axios.defaults.baseURL = 'http://localhost:8088/api';
        axios.defaults.headers.common = {...axios.defaults.headers.common, ...authHeader()}
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
}

export default new ConfigMiddleware()