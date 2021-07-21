import { Request, Response } from 'express'
import { getPOs, checkPOExistsWithPONumber, createPO, searchPOs, getPO } from '../services/purchaseOrder'
import { BaseController } from './base'
import { ErrorMessage } from '../types/error'

export default class PurchaseOrderController extends BaseController {
  public getAllPOs = async (req: Request, res: Response) => {
    try {
      const purchaseOrders = await getPOs()
      return this.ok(res, purchaseOrders)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public getPO = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const purchaseOrder = await getPO(id)
      return this.ok(res, purchaseOrder)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public create = async (req: Request, res: Response) => {
    const { purchaseOrderNo, status, remarks } = req.body

    // check if Purchase Order already existed
    try {
      const poExists = await checkPOExistsWithPONumber(purchaseOrderNo)
      if (poExists) return this.clientError(res, ErrorMessage.PO_EXISTS)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }

    // create Purchase Order
    try {
      const result = await createPO({ ...req.body })
      return this.ok(res, result)
    } catch (createError) {
      return this.internalServerError(res)
    }
  }

  /**
 * Uses mongodb's full text search. bookingNo field is indexed & texted in /models/booking <index: true, text: true>
 * @param value - string
 * @returns array of bookings if found or empty array
 */

   public searchPO = async (req: Request, res: Response) => {
     const { value } = req.body

     try {
       const purchaseOrders = await searchPOs(value)
       return this.ok(res, purchaseOrders)
     } catch (error) {
       console.log('Error', error)
       return this.internalServerError(res)
     }
   }
}
