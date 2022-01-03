import mysql from 'mysql2';

let sqlConnection = null

class MySqlConnection {
    static async pingMySql() {
        const disconnected = await new Promise(resolve => {
            if (!sqlConnection) {
                resolve(true);
                return
            }
            sqlConnection.ping(err => {
                resolve(err);
            });
        });
        if (disconnected) {
            return this.openConnect()
        }
        return new Promise(resolve => resolve(sqlConnection))
    }

    static openConnect() {
        const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE } = process.env;
        return new Promise((resolve, reject) => {
            sqlConnection = mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DATABASE,
                connectTimeout: 30000,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            sqlConnection.connect(function(err) {
                if (err) {
                    reject({ error: true, cause: err });
                    return
                }
                resolve(sqlConnection)
            });
        })
    }

    static async getConnect() {
        if (!sqlConnection) {
            return this.openConnect()
        }
        return new Promise(resolve => resolve(sqlConnection))
    }

    static query(sql, params = []) {
        return new Promise(async (resolve, reject) => {
            let sqlConnection = await MySqlConnection.getConnect()
            sqlConnection.query(sql, params, function (err, result) {
                if (err) {
                    reject({ error: true, cause: err });
                    return
                }
                resolve(result)
            });
        });
    }
}

export default MySqlConnection
