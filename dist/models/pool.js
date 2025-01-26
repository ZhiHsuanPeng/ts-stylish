import mysql from 'mysql2/promise';
export class DBConnection {
    static connection;
    constructor() { }
    static async getInstance() {
        try {
            if (this.connection) {
                this.connection = await mysql.createConnection({
                    host: 'localhost',
                    user: 'jeremy',
                    password: 'jeremy',
                    database: 'stylish',
                });
                return this.connection;
            }
            else {
                return this.connection;
            }
        }
        catch (err) {
            throw err;
        }
    }
}
