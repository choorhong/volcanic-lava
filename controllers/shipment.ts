import { Request, Response } from 'express'
import { getShipments, createShipment, getShipment, editShipmentById, deleteShipmentById } from '../services/shipment'
import { BaseController } from './base'
import mongoose from 'mongoose'

export default class ShipmentController extends BaseController {
  public getAllShipments = async (req: Request, res: Response) => {
    try {
      const shipments = await getShipments()
      return this.ok(res, shipments)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public getShipment = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const shipment = await getShipment(id)
      return this.ok(res, shipment)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public editShipment = async (req: Request, res: Response) => {
    const { id } = req.query as { id : string }
    // validation first....

    // edit shipments
    try {
      const values = req.body
      const shipmentData = {
        ...req.body,
        purchaseOrderNo: new mongoose.mongo.ObjectID(values.purchaseOrderNo),
        bookingNo: new mongoose.mongo.ObjectID(values.bookingNo)
      }

      const result = await editShipmentById(id, shipmentData)
      return this.ok(res, result)
    } catch (createError) {
      return this.internalServerError(res)
    }
  }

  public create = async (req: Request, res: Response) => {
    // validation first....

    // create shipments
    try {
      const values = req.body
      const shipmentData = {
        ...req.body,
        purchaseOrderNo: new mongoose.mongo.ObjectID(values.purchaseOrderNo),
        bookingNo: new mongoose.mongo.ObjectID(values.bookingNo)
      }

      const result = await createShipment(shipmentData)
      return this.ok(res, result)
    } catch (createError) {
      return this.internalServerError(res)
    }
  }

  public deleteShipment = async (req: Request, res: Response) => {
    const { id } = req.query as { id : string }
    try {
      const result = await deleteShipmentById(id)
      return this.ok(res, result)
    } catch (createError) {
      return this.internalServerError(res)
    }
  }
}
