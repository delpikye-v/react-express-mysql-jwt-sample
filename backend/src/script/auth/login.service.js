import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import MySqlConnection from '../../utils/database/mysql.connect.js';
import MessageException from '../../utils/exceptions/msg.exception.js';

import UserService from '../users/user.service.js'

/** * Split file if source is large */
class LoginService {
    static async signIn(req, res) {
        try {
            const { user_name, password } = req.body;

            const sqlQuery = 'SELECT user_id, user_name, email, password, is_admin FROM users where user_name = ?';
            let result = await MySqlConnection.query(sqlQuery, [user_name]);

            let pwd = result[0]?.password;
            if (pwd === undefined || !bcrypt.compareSync(password, pwd)) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid User or Password!',
                    error: true,
                });
            }

            let { JWT_SECRET } = process.env;
            const token = jwt.sign({ user_name: result[0].user_name, email: result[0].email }, JWT_SECRET, {
                expiresIn: '30m',
            });

            let isAdmin = result[0]['is_admin'] === 1

            delete result[0]['password']
            delete result[0]['is_admin']
            res.status(200).send({
                result: {
                    ...result[0],
                    accessToken: token,
                    isAdmin
                },
            });
        } catch {
            return arguments[2](MessageException.badRequest());
        }
    }

    static async signUp(req, res, next) {
        req.body.sendMail = true // forced send mail
        return UserService.create(req, res, next)
    }
}

export default LoginService;
