import * as _ from 'lodash'
const db = require('../../models')

const createClinic = async (req, res) => {
  try {
    const { name, address, imageBase64, contentHTML, contentMarkdown } =
      req.body
    if (!name || !address || !imageBase64 || !contentHTML || !contentMarkdown)
      return res.status(400).json({
        status: 'failed',
        message: 'Bad request, missing required fields',
      })
    await db.Clinics.create({
      name,
      address,
      image: imageBase64,
      contentHTML,
      contentMarkdown,
    })
    res.status(201).json({
      status: 'success',
      message: 'New clinic created successfully',
    })
  } catch (error) {
    console.log(error)
  }
}

const getClinics = async (req, res) => {
  try {
    const clinics = await db.Clinics.findAll()
    if (clinics.length > 0) {
      return res.status(200).json({ status: 'success', data: clinics })
    }
  } catch (error) {
    console.log(error)
  }
}

const getDetailClinic = async (req, res) => {
  try {
    const { id } = req.query
    if (!id)
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing required queries' })
    const clinic = await db.Clinics.findOne({
      where: { id },
    })
    if (!_.isEmpty(clinic)) {
      let doctorClinic = []
      doctorClinic = await db.Doctor_Info.findAll({
        where: { clinicId: id },
        attributes: ['doctorId', 'provinceId'],
      })
      clinic.doctorClinic = doctorClinic
    }
    res.status(200).json({ status: 'success', data: clinic })
  } catch (error) {
    console.log(error)
  }
}

export { createClinic, getClinics, getDetailClinic }
