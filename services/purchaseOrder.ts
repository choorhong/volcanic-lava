import { QueryOptions } from 'mongoose'
import PurchaseOrder from '../models/purchaseOrder'

export const checkPOExistsWithPONumber = async (purchaseOrderNo: string) => PurchaseOrder.exists({ purchaseOrderNo })

export const createPO = (data: Record<string, any>) => PurchaseOrder.create(data)

export const getPOs = () => PurchaseOrder.find()

export const getPO = (purchaseOrderNo: string, projection: Record<string, any> = {}, options: QueryOptions | null = null) => PurchaseOrder.find({ purchaseOrderNo }, projection, options)

export const searchPOs = async (purchaseOrderNo: string, projection: Record<string, any> = { purchaseOrderNo: 1 }, sort = {}, limit = 3) => {
  return PurchaseOrder.find(
    { $text: { $search: purchaseOrderNo } },
    { score: { $meta: 'textScore' }, ...projection },
    { sort, limit }
  ).sort({ score: { $meta: 'textScore' } })
}
