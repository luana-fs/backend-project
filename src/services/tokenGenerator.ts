import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class TokenGenerator {
    private static expiresIn: number = 1200

    public generate = (input: string): string => {
        const newToken = jwt.sign({ id: input }, process.env.JWT_KEY as string, { expiresIn: TokenGenerator.expiresIn });
        return newToken
    }

    public verify(token: string) {
        const payload = jwt.verify(token, process.env.JTW_KEY as string) as any;
        const result = { id: payload.id, role: payload.role }
        return result
    }
}

export default new TokenGenerator()