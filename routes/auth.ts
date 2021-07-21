import { Router } from 'express'
import AuthController from '../controllers/auth'
import AuthMiddlewareController from '../middlewares/auth'

const router = Router()
const authM = new AuthMiddlewareController()
const auth = new AuthController()

router.post('/create-find-user', authM.verifyToken, auth.createOrFindUser)

export default router
