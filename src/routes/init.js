import express from 'express'
import userRouter from './userRouter'
import authRouter from './authRouter'
import allcodeRouter from './allcodeRouter'
import homeRouter from './homeRouter'
import doctorRouter from './doctorRouter'
import patientRouter from './patientRouter'
import { createUser, getCRUDPage, getHome } from '../controllers/home'

const router = express.Router()

const initRouter = (app) => {
  router.get('/', getHome)
  router.get('/crud', getCRUDPage)
  router.post('/crud', createUser)
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/allcode', allcodeRouter)
  app.use('/api/v1/home', homeRouter)
  app.use('/api/v1/doctor', doctorRouter)
  app.use('/api/v1/patient', patientRouter)
  return app.use('/', router)
}

export default initRouter
