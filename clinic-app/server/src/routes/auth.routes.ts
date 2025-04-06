import { getProfile } from 'controllers/auth/getProfile.controller'
import { loginUser } from 'controllers/auth/login.controller'
import { Router } from 'express'

const routerAuth = Router()

routerAuth.post('/login', loginUser)
routerAuth.get('/profile', getProfile)

export default routerAuth
