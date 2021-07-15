import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";



export class UserDatabase extends BaseDatabase {
    protected tableName: string = "user" 

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(this.tableName).insert(user)
        } catch (err) {
            throw new Error(err.message || err.sqlMessage)
        }
    }
}

// export class UserDatabase extends BaseDatabase {
//     protected tableName: string = "user" 

//     public async createUser(user: User): Promise<void> {
//         try {
//             await BaseDatabase.connection.knex(this.tableName).insert(user)
//         } catch (err) {
//             throw new Error(err.message || err.sqlMessage)
//         }
//     }
// }

export default new UserDatabase()