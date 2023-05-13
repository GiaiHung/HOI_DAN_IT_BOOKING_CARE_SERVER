import * as _ from 'lodash'
const db = require('../../models')

const getSpecialties = async (req, res) => {
  try {
    const specialties = await db.Specialty.findAll()
    if (specialties.length > 0) {
      specialties.map((specialty) => {
        specialty.image = new Buffer(specialty.image, 'base64').toString(
          'binary'
        )
        return specialty
      })
      res.status(200).json({ status: 'success', data: specialties })
    }
  } catch (error) {
    console.log(error)
  }
}

const getSpecialty = async (req, res) => {
  try {
    const { id, location } = req.query
    if (!id || !location)
      return res
        .status(400)
        .json({ status: 'failed', message: 'Missing required queries' })
    const specialty = await db.Specialty.findOne({
      where: { id },
      attributes: {
        exclude: ['image'],
      },
    })
    if (!_.isEmpty(specialty)) {
      let doctorSpecialty = []
      if (location === 'ALL') {
        doctorSpecialty = await db.Doctor_Info.findAll({
          where: { specialtyId: id },
          attributes: ['doctorId', 'provinceId'],
        })
      } else {
        doctorSpecialty = await db.Doctor_Info.findAll({
          where: { specialtyId: id, provinceId: location },
          attributes: ['doctorId', 'provinceId'],
        })
      }
      specialty.doctorSpecialty = doctorSpecialty
    }
    res.status(200).json({ status: 'success', data: specialty })
  } catch (error) {
    console.log(error)
  }
}

const createSpecialty = async (req, res) => {
  try {
    const { name, imageBase64, contentHTML, contentMarkdown } = req.body
    if (!name || !imageBase64 || !contentHTML || !contentMarkdown)
      return res.status(400).json({
        status: 'failed',
        message: 'Bad request, missing required fields',
      })
    await db.Specialty.create({
      name,
      image: imageBase64,
      contentHTML,
      contentMarkdown,
    })
    res.status(201).json({
      status: 'success',
      message: 'New specialty created successfully',
    })
  } catch (error) {
    console.log(error)
  }
}

export { getSpecialty, getSpecialties, createSpecialty }
