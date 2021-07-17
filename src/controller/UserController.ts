import { Request, Response, NextFunction } from 'express'
import UserBusiness from '../business/UserBusiness'
import UserDatabase from '../database/UserDatabase'
import { CustomError } from '../errors/CustomError'

export class UserController {
    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, nickname, password } = req.body
            const result = await UserBusiness.signup( name, email, nickname, password )

        
            res.status(200).send(result)
        } catch (err) {
            next(err)
            // throw new Error(err.message)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const result = await UserBusiness.login( email, password )
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController()



// export async const up = knex => knex.schema.createTable('users', table => {
//     table.text('id').notNullable()
//     table.text('name').notNullable()
//     table.text('email').unique().notNullable()
//     table.text('nickname').notNullable()
//     table.text('password').notNullable()
// })

// export async const down = knex => knex.schema.dropTable('users')

// npx knex --knexfile knexfile.ts migrate:make -x ts example-migration