import shortUUID from 'short-uuid';
import bcrypt from 'bcryptjs'

import HttpException from '../../utils/exceptions/http.exception.js';
import MessageException from '../../utils/exceptions/msg.exception.js';
import MailCommon from '../../utils/common/mail.common.js';

import MySqlConnection from '../../utils/database/mysql.connect.js';

/** * Split file if source is large */
class UserService {
    static async pingDb(req, res) {
        try {
            await MySqlConnection.pingMySql()
            res.json({
                result: 'OK'
            })
        } catch {
            return arguments[2](new HttpException(500, 'Invalid database connection request!'));
        }
    }

    static async list(req, res) {
        let userConfigAuth = req.userConfigAuthSomethingSecuriryInfo
        try {
            let isAdmin = await UserService.isAdmin(userConfigAuth.user_name)
            if (!isAdmin) {
                return arguments[2](MessageException.notAuth());
            }

            const sqlQuery = "SELECT user_id, user_name, email, is_admin FROM users order by user_name";
            let result = await MySqlConnection.query(sqlQuery)
            res.status(200).json({
                result
            })
        } catch {
            return arguments[2](MessageException.badRequest());
        }
    }

    static async get(req, res) {
        try {
            const { id } = req.params
            const sqlQuery = "SELECT * FROM users where user_id = ?"

            let result = await MySqlConnection.query(sqlQuery, [id])
            // res.status(!result[0] ? 404 : 200)
            res.status(!result[0] ? 404 : 200).json({
                result: result[0]
            })
        } catch {
            return arguments[2](MessageException.badRequest());
        }
    }

    static async create(req, res) {
        try {
            let { user_name, email, full_name, sendMail } = req.body
            const sqlExist = "SELECT user_id from `users` WHERE user_name = ? OR email = ?"
            let result = await MySqlConnection.query(sqlExist, [user_name, email])
            if (result[0]) {
                return arguments[2](new HttpException(409 , 'User or email exist!'));
            }

            let id = shortUUID.uuid()

            let { FAKE_USER_PASSWORD } = process.env
            let password = !FAKE_USER_PASSWORD ? Math.random().toString(36).slice(-8) : FAKE_USER_PASSWORD

            let params = [id, user_name, email, bcrypt.hashSync(password, 8), full_name, 0, 0]
            const sqlQuery = "INSERT INTO `users` VALUES (?, ?, ?, ?, ?, ?, ?)"

            result = await MySqlConnection.query(sqlQuery, params)
            let { affectedRows } = result
            let success = affectedRows !== 0

            let isSendMail = true
            if (sendMail) {
                try {
                    await MailCommon.send(email, 'Register password: ', `This is your password: ${password}`)
                } catch {
                    isSendMail = false
                }
            }
            res.status(200).json({
                result: success ? { user_id: id, user_name, email, full_name } : null,
                message: success ? 'Created!' : 'No Content',
                mail: {
                    message: isSendMail ? 'Password is sent to your email!' : 'Mailing error, contact admin to get password!',
                    error: !isSendMail
                },
            })
        } catch {
            return arguments[2](MessageException.badRequest());
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            let { user_name, email, full_name } = req.body

            // check exist user
            const sqlCount = "SELECT COUNT(user_id) as counter from `users` WHERE user_id = ?"
            let result = await MySqlConnection.query(sqlCount, [id])
            if (!result[0]?.counter) {
                return arguments[2](new HttpException(404, 'User does not exist!'));
            }

            // check exist email
            const sqlExist = "SELECT COUNT(user_id) as counter from `users` WHERE email = ? AND user_id != ?"
            result = await MySqlConnection.query(sqlExist, [email, id])
            if (result[0]?.counter) {
                return arguments[2](new HttpException(409 , 'Email exist!'));
            }

            // update data
            let params = [email, full_name, id]
            const sqlQuery = "UPDATE `users` set email = ?, full_name = ? WHERE user_id = ?"
            result = await MySqlConnection.query(sqlQuery, params)
            let { affectedRows } = result
            let success = affectedRows !== 0
            res.status(success ? 200 : 204).json({
                result: success ? { user_id: id, user_name, email, full_name } : null,
                message: success ? 'Updated!' : 'No Content'
            })
        } catch {
            return arguments[2](MessageException.badRequest());
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            const sqlQuery = "DELETE FROM `users` WHERE user_id = ? AND is_admin != 1"
            let result = await MySqlConnection.query(sqlQuery, [id])

            let { affectedRows } = result
            let success = affectedRows !== 0
            res.status(success ? 200 : 204).json({
                result: success,
                message: success ? 'Deleted!' : 'No Content'
            })
        } catch {
            return arguments[2](MessageException.badRequest());
        }
    }

    /** Check user is admin */
    static async isAdmin(user_name) {
        // check exist email
        const sqlExist = "SELECT COUNT(user_id) as counter from `users` WHERE user_name = ? AND is_admin = 1"
        let result = await MySqlConnection.query(sqlExist, [user_name])
        return result[0]?.counter === 1
    }
}

export default UserService;
