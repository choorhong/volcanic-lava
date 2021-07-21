import { Router } from 'express'
import BookingController from '../controllers/booking'

const router = Router()
// const auth = new AuthMiddleware()
const booking = new BookingController()

router.post('/create', booking.create)

router.post('/search', booking.searchBooking)

router.get('/:id', booking.getBooking)

router.get('/', booking.getAllBookings)

export default router
