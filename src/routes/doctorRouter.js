import express from 'express'
import {
  createSchedule,
  getAllDoctors,
  getDoctorDetail,
  getExtraInfor,
  getScheduleByDate,
  saveDoctor,
} from '../controllers/doctors'
import {
  getDoctorInfo,
  getListPatientForDoctor,
  sendRemedy,
} from '../controllers/doctors/modal'

const router = express.Router()

router.get('/', getAllDoctors)
router.get('/get-schedule-by-date', getScheduleByDate)
router.get('/extra-info', getExtraInfor)
router.get('/doctor-info', getDoctorInfo)
router.get('/patient-list', getListPatientForDoctor)
router.get('/:id', getDoctorDetail)
router.post('/', saveDoctor)
router.post('/schedule', createSchedule)
router.post('/send-remedy', sendRemedy)

export default router
