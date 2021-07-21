import { QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import Shipment from '../models/shipment'

export const createShipment = (data: Record<string, any>) => Shipment.create(data)

export const getShipment = (id: string, projection: Record<string, any> = {}, options: QueryOptions | null = null) => Shipment.findById(id, projection, options).populate('purchaseOrderNo').populate('bookingNo')

export const getShipments = () => Shipment.find().populate('purchaseOrderNo').populate('bookingNo')

export const editShipmentById = (id: string, update: UpdateQuery<any> | UpdateWithAggregationPipeline, options: QueryOptions | null = null) => Shipment.findByIdAndUpdate(id, update, { ...options, new: true })

export const deleteShipmentById = (id: string, options: QueryOptions | null = null) => Shipment.findByIdAndDelete(id, options)
