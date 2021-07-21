import Shipment from '../models/shipment'

export const createShipment = (data: Record<string, any>) => Shipment.create(data)

export const getShipments = () => Shipment.find().populate('purchaseOrderNo').populate('bookingNo')
