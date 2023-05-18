import * as _ from 'lodash'
import db from '../../models'
import { sendAttachment } from '../../services/emailService'

const getDoctorInfo = async (req, res) => {
  const id = req.query.id
  try {
    if (!id)
      return res.status(400).json({ status: 'failed', message: 'Missing id' })
    const doctor = await db.User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.Allcodes,
          as: 'positionData',
          attributes: ['value_en', 'value_vi'],
        },
        {
          model: db.Doctor_Info,
          attributes: {
            exclude: ['id', 'doctorId', 'updatedAt', 'createdAt'],
          },
          include: [
            {
              model: db.Allcodes,
              as: 'priceTypeData',
              attributes: ['value_en', 'value_vi', 'keyMap'],
            },
            {
              model: db.Allcodes,
              as: 'paymentTypeData',
              attributes: ['value_en', 'value_vi', 'keyMap'],
            },
            {
              model: db.Allcodes,
              as: 'provinceTypeData',
              attributes: ['value_en', 'value_vi', 'keyMap'],
            },
          ],
        },
      ],
      nest: true,
      raw: true,
    })
    if (!doctor)
      return res
        .status(404)
        .json({ status: 'failed', message: 'No doctor found' })
    res.status(200).json({ status: 'success', data: doctor })
  } catch (error) {
    console.log(error)
  }
}

const getListPatientForDoctor = async (req, res) => {
  const { doctorId, date } = req.query
  if (!doctorId || !date)
    return res
      .status(400)
      .json({ status: 'failed', message: 'Missing required queries' })
  const patient = await db.Bookings.findAll({
    where: {
      doctorId,
      time: date,
      statusId: 'S2',
    },
    include: [
      {
        model: db.User,
        as: 'patientData',
        attributes: ['email', 'firstName', 'address'],
        include: [
          {
            model: db.Allcodes,
            as: 'genderData',
            attributes: ['value_en', 'value_vi'],
          },
        ],
      },
    ],
    raw: false,
    nest: true,
  })
  res.status(200).json({ status: 'success', data: patient })
}

const sendRemedy = async (req, res) => {
  try {
    const { name, email, doctorId, patientId, timeType } = req.body
    if (!name || !email || !doctorId || !patientId || !timeType) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing required information' })
    }

    const appointment = await db.Bookings.findOne({
      where: {
        doctorId,
        patientId,
        timeType,
        statusId: 'S2',
      },
      raw: false,
    })

    if (appointment) {
      appointment.statusId = 'S3'
      appointment.save()
    }

    await sendAttachment(req.body)

    res
      .status(200)
      .json({ status: 'success', message: 'Successfully confirmed!' })
  } catch (error) {
    console.log(error)
  }
}

export { getDoctorInfo, getListPatientForDoctor, sendRemedy }
