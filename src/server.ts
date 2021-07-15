import express from 'express'
import { userRouter } from './router/UserRouter'

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(3003, () => console.log("Server runnin on port 3003."))

export default app