import express from 'express'
import { getAllcode } from '../controllers/allcode'

const router = express.Router()

router.get('/', getAllcode)

export default router
