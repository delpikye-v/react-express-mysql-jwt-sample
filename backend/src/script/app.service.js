import shortUUID from 'short-uuid';
import bcrypt from 'bcryptjs'

import loggerMiddleware from "../middleware/logger.middleware.js";

import MySqlConnection from "../utils/database/mysql.connect.js";

/** Run something before start sql */
class AppService {
    /** Add account manager user. FAKE FIRST*/
    static async registerAdm() {
        const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

        let sqlQuery1 = 'SELECT user_id from `users` WHERE user_name = ? OR email = ?'
        let result = await MySqlConnection.query(sqlQuery1, [ADMIN_USERNAME, ADMIN_EMAIL])
        if (result[0]) {
            return
        }

        let id = shortUUID.uuid()
        let params = [id, ADMIN_USERNAME, ADMIN_EMAIL, bcrypt.hashSync(ADMIN_PASSWORD, 8), 'Something', 1, 1]
        let sqlQuery = "INSERT INTO `users`(user_id, user_name, email, password, full_name, activated, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)"

        result = await MySqlConnection.query(sqlQuery, params)
        let { affectedRows } = result
        let success = affectedRows !== 0
        loggerMiddleware.info(success ? 'AdmUser register.' : '')
    }
}

export default AppService