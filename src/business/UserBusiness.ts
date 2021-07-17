import BaseDatabase from "../database/BaseDatabase";
import userDatabase, { UserDatabase } from "../database/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { User } from "../model/User";
import hashGenerator, { HashGenerator } from "../services/hashGenerator";
import idGenerator, { IdGenerator } from "../services/idGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";


export class UserBusiness {

    constructor (
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenerator,
        private userDatabase: UserDatabase,
        private tokenGenerator: TokenGenerator
    ) {}

    public async signup(name: string, email: string, nickname: string, password: string) {
        try {
            if(!name || !email || !nickname || !password ) {
                throw new CustomError(422, "Missing input")
            }

            if (email.indexOf("@") === -1) {
                throw new CustomError(422, "Invalid email");
             }

             if (password.length < 6) {
                throw new CustomError(422, "Invalid password");
             }

            const id = this.idGenerator.generate()
            const cypherPassword = await this.hashGenerator.hash(password)

            await this.userDatabase.createUser(
                new User(id, name, email, nickname, cypherPassword)
            )

            const accessToken = this.tokenGenerator.generate(id)

            return { accessToken }
        } catch (err) {
            if(err.message.includes("Duplicate entry")) {
                throw new CustomError(409, "Email already in use.")
            }
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public async login(email: string, password: string) {
        try {
            if (!email || !password) {
                throw new CustomError(422, "Missing input");
             }

             const user = await this.userDatabase.getUserByEmail(email)

             if (!user) {
                throw new CustomError(401, "Invalid credentials");
             }

             const isPasswordCorrect = await this.hashGenerator.compareHash( password, user.getPassword())

             if (!isPasswordCorrect) {
                throw new CustomError(401, "Invalid password");
             }

             const accessToken = this.tokenGenerator.generate( user.getId() )

             return { accessToken}
        } catch (err) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
   
}

export default new UserBusiness(idGenerator, hashGenerator, userDatabase, tokenGenerator)

//quando exportamos a classe, precisa exportar os argumentos juntos?