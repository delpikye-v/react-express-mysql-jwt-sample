import 'dotenv/config';

import App from './app.js'
import LoginController from './script/auth/login.controller.js';
import UserController from './script/users/user.controller.js';

const app = new App(
    [
        new UserController(),
        new LoginController()
        // more define...
    ],
    Number(process.env.PORT)
)

app.start()
