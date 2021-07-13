import dotenv from 'dotenv'
// import {Knex, knex} from 'knex'

const knexfile = require('../../knexfile') 
const knex = require('knex')(knexfile)

dotenv.config()

export default class BaseDatabase {

    protected static connection = knex(knexfile)

    public static async destroyConnection(): Promise<void> {
        await BaseDatabase.connection.destroy();
    }
}

// export default class BaseDatabase {

//     protected static connection: Knex = knex()

//     protected static connection: Knex = knex({
//         client: process.env.DB_CONNECTION,
//         connection: {
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_SCHEMA,
//             port: 3306,
//             multipleStatements: true
//         }
//     })

//     public static async destroyConnection(): Promise<void> {
//         await BaseDatabase.connection.destroy();
//     }
// }