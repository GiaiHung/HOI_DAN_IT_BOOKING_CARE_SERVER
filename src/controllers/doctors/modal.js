import * as _ from 'lodash'
import db from '../../models'

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

export { getDoctorInfo }
