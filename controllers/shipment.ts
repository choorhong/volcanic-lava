import { Request, Response } from 'express'
import { getShipments, createShipment } from '../services/shipment'
import { BaseController } from './base'
import mongoose from 'mongoose'

export default class BookingController extends BaseController {
  public getAllShipments = async (req: Request, res: Response) => {
    try {
      const shipments = await getShipments()
      return this.ok(res, shipments)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public create = async (req: Request, res: Response) => {
    // validation first....

    // create shipments
    try {
      const values = req.body
      console.log('values', values)
      const shipmentData = {
        ...req.body,
        purchaseOrderNo: new mongoose.mongo.ObjectID(values.purchaseOrderNo),
        bookingNo: new mongoose.mongo.ObjectID(values.bookingNo)
      }
      console.log('shipments', shipmentData)

      const result = await createShipment(shipmentData)
      return this.ok(res, result)
    } catch (createError) {
      return this.internalServerError(res)
    }
  }
}
