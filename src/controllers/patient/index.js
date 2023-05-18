import db from '../../models'
import * as _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '../../services/emailService'

const bookingAppointment = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      phone,
      gender,
      date,
      timeType,
      time,
      doctorId,
      doctorName,
      language,
    } = req.body
    if (
      !name ||
      !email ||
      !address ||
      !phone ||
      !gender ||
      !date ||
      !timeType ||
      !doctorId
    )
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing required parameters' })
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        firstName: name,
        address,
        gender,
        phonenumber: phone,
        email,
        roleId: 'R3',
      },
    })
    if (!_.isEmpty(user)) {
      const token = uuidv4()
      const link = `${process.env.REACT_APP_URL}/verify-booking?doctorId=${doctorId}&token=${token}`
      const [booking, created] = await db.Bookings.findOrCreate({
        where: { patientId: user.id },
        defaults: {
          statusId: 'S1',
          patientId: user.id,
          doctorId,
          date,
          timeType,
          time,
          token,
        },
      })
      if (created) {
        await sendEmail({
          receiverEmail: email,
          name: name,
          doctorName,
          time: date,
          redirectLink: link,
          language,
        })
      }
    }
    res.status(200).json({
      status: 'success',
      message: 'Appointment has been booked successfully!',
    })
  } catch (error) {
    console.log(error)
  }
}

const postVerifyBooking = async (req, res) => {
  const { doctorId, token } = req.query
  if (!doctorId || !token)
    return res.status(400).json({
      status: 'failed',
      message: 'Bad request. Please provide enough parameters',
    })
  const appointment = await db.Bookings.findOne({
    where: {
      doctorId,
      token,
      statusId: 'S1',
    },
    raw: false,
  })
  if (appointment) {
    appointment.statusId = 'S2' // S2 means confirmed in allcodes
    await appointment.save()
    res.status(200).json({
      status: 'success',
      message: 'Confirmed appointment successfully',
    })
  } else {
    res.status(400).json({
      status: 'failed',
      message: 'Appointment has been activated or does not exist',
    })
  }
}

export { bookingAppointment, postVerifyBooking }
