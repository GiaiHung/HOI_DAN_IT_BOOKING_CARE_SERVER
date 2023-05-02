import * as _ from 'lodash'
import db from '../../models'

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: 'R2' },
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['password', 'image'],
      },
    })
    res.status(200).json({ status: 'success', data: doctors })
  } catch (error) {
    console.log(error)
  }
}

const saveDoctor = async (req, res) => {
  const {
    description,
    selectedDoctor,
    contentHTML,
    contentMarkdown,
    action,
    selectedPrice,
    selectedProvince,
    selectedPayment,
    address,
    clinicName,
    note,
  } = req.body
  if (
    !description ||
    !contentHTML ||
    !contentMarkdown ||
    !selectedPrice ||
    !selectedProvince ||
    !selectedPayment ||
    !address ||
    !clinicName
  ) {
    return res
      .status(400)
      .json({ status: 'failed', message: 'Please provide full info' })
  }
  if (action === 'CREATE') {
    await db.Markdown.create({
      contentHTML: contentHTML,
      contentMarkdown: contentMarkdown,
      doctorId: selectedDoctor.value,
      introduction: description,
    })
  } else if (action === 'EDIT') {
    const markdown = await db.Markdown.findOne({
      where: { doctorId: selectedDoctor.value },
      raw: false,
    })
    markdown.contentHTML = contentHTML
    markdown.contentMarkdown = contentMarkdown
    markdown.introduction = description
    await markdown.save()
  }

  const doctorInfo = await db.Doctor_Info.findOne({
    where: {
      doctorId: selectedDoctor.value,
    },
    raw: false,
  })

  if (doctorInfo) {
    doctorInfo.priceId = selectedPrice
    doctorInfo.provinceId = selectedProvince
    doctorInfo.paymentId = selectedPayment
    doctorInfo.addressClinic = address
    doctorInfo.nameClinic = clinicName
    doctorInfo.note = note
    await doctorInfo.save()
  } else {
    await db.Doctor_Info.create({
      doctorId: selectedDoctor.value,
      priceId: selectedPrice,
      provinceId: selectedProvince,
      paymentId: selectedPayment,
      addressClinic: address,
      nameClinic: clinicName,
      note: note,
    })
  }

  res.status(200).json({ status: 'success' })
}

const getDoctorDetail = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ status: 'failed', message: 'Missing id' })
    const doctor = await db.User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.Markdown,
          attributes: ['contentHTML', 'contentMarkdown', 'introduction'],
        },
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

const createSchedule = async (req, res) => {
  try {
    const { arrSchedule, doctorId, date } = req.body
    if (arrSchedule.length === 0 || !doctorId || !date) {
      res
        .status(400)
        .json({ status: 'failed', message: 'Missing required fields' })
    }
    let existing = await db.Schedule.findAll({
      where: { doctorId: doctorId, date: date },
      attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
    })
    const toCreate = _.differenceWith(arrSchedule, existing, (a, b) => {
      return a.timeType === b.timeType && a.date === b.date
    })
    if (toCreate.length > 0) {
      const data = await db.Schedule.bulkCreate(toCreate)
      if (data) {
        return res.status(200).json({ status: 'success', data })
      }
    }
    return res
      .status(400)
      .json({ status: 'failed', message: 'Doctor already haved scheduled' })
  } catch (error) {
    console.log(error)
  }
}

const getScheduleByDate = async (req, res) => {
  try {
    const { doctorId, date } = req.query
    if (!doctorId || !date) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing required parameter' })
    }
    let data = await db.Schedule.findAll({
      where: {
        doctorId,
        date,
      },
      include: [
        {
          model: db.Allcodes,
          attributes: ['value_vi', 'value_en'],
          as: 'timeTypeData',
        },
        {
          model: db.User,
          attributes: ['firstName', 'lastName'],
          as: 'doctorData',
        },
      ],
      raw: false,
      nest: true,
    })
    if (!data) data = []
    res.status(200).json({ status: 'success', data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'failed', message: 'Error from server' })
  }
}

const getExtraInfor = async (req, res) => {
  try {
    const id = req.query.id
    if (!id)
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing doctor id' })
    const data = await db.Doctor_Info.findOne({
      where: { doctorId: id },
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
      nest: true,
      raw: true,
    })
    if (_.isEmpty(data.data)) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Something went wrong' })
    }
    res.status(200).json({ status: 'success', data })
  } catch (error) {
    console.log(error)
  }
}

export {
  getAllDoctors,
  saveDoctor,
  getDoctorDetail,
  createSchedule,
  getScheduleByDate,
  getExtraInfor,
}
