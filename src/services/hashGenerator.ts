import bcrypt from 'bcryptjs'

export class HashGenerator {
    public hash = async (plainText: string): Promise<any> => {
        const rounds: number = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(plainText, salt)
        return result
    }

    public compareHash = async (plainText: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(plainText, hash)
    }
}

export default new HashGenerator()