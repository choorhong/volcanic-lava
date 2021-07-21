import * as express from 'express'
import { ErrorMessage } from '../types/error'

export abstract class BaseController {
  /*
    This class contains reusable methods to handle errors and responses,
    can only be extended by other classes.
  */

  public static jsonResponse (
    res: express.Response, code: number, message: string
  ) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: express.Response, respM?: T) {
    if (respM) {
      res.type('application/json')
      return res.status(200).json(respM)
    } else {
      return res.sendStatus(200)
    }
  }

  public created (res: express.Response) {
    return res.sendStatus(201)
  }

  public internalServerError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 500, message || ErrorMessage.INTERNAL_SERVER_ERROR)
  }

  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message || ErrorMessage.INCORRECT_DETAILS)
  }

  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message || ErrorMessage.UNAUTHORIZED)
  }

  public paymentRequired (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message || ErrorMessage.PAYMENT_REQUIRED)
  }

  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message || ErrorMessage.FORBIDDEN)
  }

  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message || ErrorMessage.NOT_FOUND)
  }

  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message || ErrorMessage.CONFLICT)
  }

  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message || ErrorMessage.TOO_MANY_REQUESTS)
  }

  public fail (res: express.Response, error: Error | string) {
    console.log(error)
    return res.status(500).json({
      message: error.toString()
    })
  }
}
