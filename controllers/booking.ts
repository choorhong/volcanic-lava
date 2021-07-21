import { Request, Response } from 'express'
import { getBookings, getBooking, checkBookingExistsWithBookingNo, createBooking, searchBookings } from '../services/booking'
import { BaseController } from './base'
import { ErrorMessage } from '../types/error'

export default class BookingController extends BaseController {
  public getAllBookings = async (req: Request, res: Response) => {
    try {
      const bookings = await getBookings()
      return this.ok(res, bookings)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public getBooking = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const booking = await getBooking(id)
      return this.ok(res, booking)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }

  public create = async (req: Request, res: Response) => {
    const { bookingNo } = req.body

    // check if booking already existed
    try {
      const bookingExists = await checkBookingExistsWithBookingNo(bookingNo)
      if (bookingExists) return this.clientError(res, ErrorMessage.BOOKING_EXISTS)
    } catch (error) {
      return this.internalServerError(res)
    }

    // create Booking
    try {
      const result = await createBooking({ ...req.body })
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

  public searchBooking = async (req: Request, res: Response) => {
    const { value } = req.body

    try {
      const bookings = await searchBookings(value)
      return this.ok(res, bookings)
    } catch (error) {
      console.log('Error', error)
      return this.internalServerError(res)
    }
  }
}
