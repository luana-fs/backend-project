import { Request, Response, NextFunction } from 'express'
import UserBusiness from '../business/UserBusiness'
import UserDatabase from '../database/UserDatabase'

export class Signup {
    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, nickname, password } = req.body
            const result = await UserBusiness.signup( name, email, nickname, password )

        
            res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }
}

export default new Signup()