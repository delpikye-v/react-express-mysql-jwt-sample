import express from 'express'
import LoginService from './login.service.js';

class LoginController {
    constructor() {
        this.path = '/auth';
        this.routes = express.Router();

        // router register
        this.routes.post('/sign-in', LoginService.signIn);
        this.routes.post('/sing-up', LoginService.signUp)
    }
}

export default LoginController;