import { RequestHandler } from 'express'
import { BaseController } from './base'
import { findUserbyEmail, createUser } from '../services/user'
import { ErrorMessage } from '../types/error'

export default class AuthController extends BaseController {
    createOrFindUser: RequestHandler = async (req, res, next) => {
      try {
        const { firebaseUser } = res.locals
        if (!firebaseUser) throw new Error()

        const user = await findUserbyEmail(firebaseUser.email)
        if (!user) {
          // No user if it does not exist in the DB
          const newUser = await createUser({
            email: firebaseUser.email,
            name: firebaseUser.name,
            firebaseUserId: firebaseUser.firebaseUserId
          })
          return this.ok(res, newUser)
        } else {
          // User exists > next (Eg: when user refreshes the page)
          return this.ok(res, user)
        }
      } catch (err) {
        console.log('err', err)
        return this.unauthorized(res, ErrorMessage.INVALID_OR_EXPIRED_TOKEN)
      }
    }
}
