import db from '../../models'

const getAllcode = async (req, res) => {
  try {
    let data
    if (!req.query.type) {
      data = await db.Allcodes.findAll()
    } else {
      data = await db.Allcodes.findAll({ where: { type: req.query.type } })
    }
    res.status(200).json({
      status: 'success',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    })
  }
}

export { getAllcode }
