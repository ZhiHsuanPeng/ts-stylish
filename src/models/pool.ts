import mysql from 'mysql2/promise'

export class DBConnection {
    static connection: mysql.Connection
    constructor() {}

    static async getInstance(): Promise<mysql.Connection> {
        try {
            if (this.connection) {
                this.connection = await mysql.createConnection({
                    host: 'localhost',
                    user: 'jeremy',
                    password: 'jeremy',
                    database: 'stylish',
                })
                return this.connection
            } else {
                return this.connection
            }
        } catch (err) {
            throw err
        }
    }
}
