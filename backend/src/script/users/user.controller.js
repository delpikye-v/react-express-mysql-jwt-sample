import express from 'express'
import jwtAuthMiddleware from '../../middleware/jwt.middleware.js';

import UserService from './user.service.js';

class UserController {
    constructor() {
        this.path = '/users';
        this.routes = express.Router();

        // router register
        this.routes.get('/pingdb', UserService.pingDb)
        this.routes.get('/', jwtAuthMiddleware, UserService.list);
        this.routes.get('/:id', jwtAuthMiddleware, UserService.get)
        this.routes.post('/', jwtAuthMiddleware, UserService.create)
        this.routes.put('/:id', jwtAuthMiddleware, UserService.update);
        this.routes.delete('/:id', jwtAuthMiddleware, UserService.delete);
    }
}

export default UserController;