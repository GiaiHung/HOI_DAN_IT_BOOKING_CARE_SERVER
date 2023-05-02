import express from 'express'
import { bookingAppointment } from '../controllers/patient'

const router = express.Router()

router.post('/booking-appointment', bookingAppointment)

export default router
