import bcrypt from 'bcryptjs'
import db from '../../models'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing email or password' })
    const user = await db.User.findOne({
      where: { email },
      raw: true,
    })
    if (!user)
      return res
        .status(404)
        .json({ status: 'failed', message: 'User does not exist' })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ status: 'failed', message: 'Password is incorrect' })
    const { password: userPassword, ...others } = user
    return res.status(200).json({ status: 'success', data: others })
  } catch (error) {}
}

export { login }
