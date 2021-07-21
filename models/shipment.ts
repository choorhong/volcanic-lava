import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shipmentSchema = new Schema(
  {
    purchaseOrderNo: {
      type: Schema.Types.ObjectId,
      ref: 'PurchaseOrder',
      required: true
    },
    bookingNo: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'CREATED'
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
)

export default mongoose.model('Shipment', shipmentSchema)
