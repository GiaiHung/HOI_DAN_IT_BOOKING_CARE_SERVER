import db from '../../models'

const getTopDoctor = async (req, res) => {
  let limit = Number(req.query.limit)
  if (!limit) limit = 10

  try {
    const users = await db.User.findAll({
      limit,
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: db.Allcodes,
          as: 'positionData',
          attributes: ['value_en', 'value_vi'],
        },
        {
          model: db.Allcodes,
          as: 'genderData',
          attributes: ['value_en', 'value_vi'],
        },
        {
          model: db.Doctor_Info,
          attributes: ['specialtyId'],
          include: [
            {
              model: db.Specialty,
              as: 'specialtyData',
              attributes: ['name'],
            },
          ],
        },
      ],
      where: { roleId: 'R2' },
      raw: true,
      nest: true,
    })
    res.status(200).json({ status: 'success', data: users })
  } catch (error) {
    console.log(error)
  }
}

export { getTopDoctor }
