import express from 'express'
import { createSpecialty } from '../controllers/specialty'

const router = express.Router()

router.post('/', createSpecialty)

export default router
