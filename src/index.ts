import app from './server'
import UserController from './controller/UserController'


app.post('/signup', UserController.signup)
app.post('/login', UserController.login)