
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookingSchema = new Schema(
  {
    bookingNo: {
      type: String,
      index: true,
      text: true,
      required: true
    },
    departure: {
      date: {
        type: Date,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    },
    arrival: {
      date: {
        type: Date,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    },
    remarks: {
      type: String

    }
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
