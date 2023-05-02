import express from 'express'
import { getTopDoctor } from '../controllers/home/index'

const router = express.Router()

router.get('/top-doctor', getTopDoctor)

export default router
