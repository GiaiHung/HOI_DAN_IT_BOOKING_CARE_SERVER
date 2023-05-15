import express from 'express'
import {
  createClinic,
  getClinics,
  getDetailClinic,
} from '../controllers/clinic'

const router = express.Router()

router.get('/', getClinics)
router.get('/detail', getDetailClinic)
router.post('/', createClinic)

export default router
