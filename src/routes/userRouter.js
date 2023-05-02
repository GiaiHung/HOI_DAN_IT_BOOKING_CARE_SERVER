import express from 'express'
import {
  createUser,
  deleteUser,
  deleteUserServer,
  getAllUsers,
  getUpdateUser,
  getUser,
  updateUser,
} from '../controllers/users'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.get('/edit', getUpdateUser)
router.get('/delete', deleteUser)
router.patch('/:id', updateUser)
router.post('/edit', updateUser)
router.post('/', createUser)
router.delete('/delete', deleteUserServer)
router.delete('/:id', deleteUser)

export default router
