import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
    protected tableName: string = "user" 

    public async createUser(user: User): Promise<void> {

    }
}