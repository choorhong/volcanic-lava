import mongoose from 'mongoose'

const Schema = mongoose.Schema

const purchaseOrderSchema = new Schema(
  {
    purchaseOrderNo: {
      type: String,
      index: true,
      text: true,
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

export default mongoose.model('PurchaseOrder', purchaseOrderSchema)
