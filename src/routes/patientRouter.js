import express from 'express'
import { bookingAppointment, postVerifyBooking } from '../controllers/patient'

const router = express.Router()

router.post('/booking-appointment', bookingAppointment)
router.post('/verify-booking', postVerifyBooking)

export default router
