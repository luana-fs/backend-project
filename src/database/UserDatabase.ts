import { CustomError } from "../errors/CustomError";
import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";



export class UserDatabase extends BaseDatabase {
    protected tableName: string = "users" 

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(this.tableName).insert(user)
        } catch (err) {
            throw new CustomError(400, err.message || err.sqlMessage)
        }
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const result = await BaseDatabase.connection()
            .select("*")
            .from(this.tableName)
            .where({ email });
            console.log(result[0])
            return User.toUserModel(result[0])
        } catch (err) {
            throw new CustomError(400, err.message || err.sqlMessage)
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