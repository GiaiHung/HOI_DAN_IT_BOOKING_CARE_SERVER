import express from 'express'
import { createSpecialty, getSpecialties } from '../controllers/specialty'

const router = express.Router()

router.get('/', getSpecialties)
router.post('/', createSpecialty)

export default router
