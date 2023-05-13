import express from 'express'
import {
  createSpecialty,
  getSpecialties,
  getSpecialty,
} from '../controllers/specialty'

const router = express.Router()

router.get('/detail', getSpecialty)
router.get('/', getSpecialties)
router.post('/', createSpecialty)

export default router
