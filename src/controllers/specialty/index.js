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

export { getSpecialties, createSpecialty }
