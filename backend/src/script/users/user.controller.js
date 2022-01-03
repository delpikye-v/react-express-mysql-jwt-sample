import express from 'express'
import jwtAuthMiddleware from '../../middleware/jwt.middleware.js';

import UserService from './user.service.js';

class UserController {
    constructor() {
        this.path = '/users';
        this.routes = express.Router();

        // router register
        this.routes.get('/pingdb', UserService.pingDb)
        this.routes.get('/', jwtAuthMiddleware, UserService.list); // ONLY PERMISSION LIST
        this.routes.get('/:id', UserService.get)
        this.routes.post('/', UserService.create)
        this.routes.put('/:id', UserService.update);
        this.routes.delete('/:id', UserService.delete);
    }
}

export default UserController;