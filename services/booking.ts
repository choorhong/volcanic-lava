import { QueryOptions } from 'mongoose'

import Booking from '../models/booking'

export const checkBookingExistsWithBookingNo = async (bookingNo: string) => Booking.exists({ bookingNo })

export const createBooking = (data: Record<string, any>) => Booking.create(data)

export const getBookings = () => Booking.find()

export const getBooking = (bookingNo: string, projection: Record<string, any> = {}, options: QueryOptions | null = null) => Booking.find({ bookingNo }, projection, options)

export const searchBookings = async (bookingNo: string, projection: Record<string, any> = { bookingNo: 1 }, sort = {}, limit = 3) => {
  return Booking.find(
    { bookingNo: { $regex: new RegExp(bookingNo) } },
    { score: { $meta: 'textScore' }, ...projection },
    { sort, limit }
  )
  //   { $text: { $search: new RegExp(bookingNo) } },
  //   { score: { $meta: 'textScore' }, ...projection },
  //   { sort, limit }
  // ).sort({ score: { $meta: 'textScore' } })
}
