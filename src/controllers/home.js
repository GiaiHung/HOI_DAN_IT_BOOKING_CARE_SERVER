import db from '../models/index'
import bcrypt from 'bcryptjs'

const getHome = async (req, res) => {
  try {
    const data = await db.User.findAll()
    return res.render('home.ejs', {
      data: JSON.stringify(data),
    })
  } catch (error) {
    console.log(error)
  }
}

const getCRUDPage = (req, res) => {
  res.render('crud.ejs')
}

const createUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address,
    phonenumber,
    gender,
    roleId,
  } = req.body
  const ifUserExisted = await db.User.findOne({ where: { email } })
  if (ifUserExisted)
    return res
      .status(400)
      .json({
        status: 'failed',
        message: 'User already exists. Please try another email!',
      })
  const salt = bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(password, salt)
  const user = await db.User.create({
    email,
    password: hash,
    firstName,
    lastName,
    address,
    phonenumber,
    gender: gender === '1' ? true : false,
    roleId,
  })
  res.status(201).json({ message: 'New user has been created', data: user })
}

export { getHome, getCRUDPage, createUser }
