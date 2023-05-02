import db from '../../models'
import * as _ from 'lodash'
import { sendEmail } from '../../services/emailService'

const bookingAppointment = async (req, res) => {
  try {
    const { name, email, date, timeType, doctorId, doctorName, language } =
      req.body
    if (!name || !email || !date || !timeType || !doctorId)
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing required parameters' })
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        email,
        roleId: 'R3',
      },
    })
    if (!_.isEmpty(user)) {
      await sendEmail({
        receiverEmail: email,
        name: name,
        doctorName,
        time: date,
        redirectLink: 'https://www.youtube.com/@JordanBPeterson',
        language,
      })
      await db.Bookings.findOrCreate({
        where: { patientId: user.id },
        defaults: {
          statusId: 'S1',
          patientId: user.id,
          doctorId,
          date,
          timeType,
        },
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Appointment has been booked successfully!',
    })
  } catch (error) {
    console.log(error)
  }
}

export { bookingAppointment }
