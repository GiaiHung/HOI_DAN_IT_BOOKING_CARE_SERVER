'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    static associate(models) {
      Bookings.belongsTo(models.User, {
        foreignKey: 'patientId',
        targetKey: 'id',
        as: 'patientData',
      })
    }
  }
  Bookings.init(
    {
      statusId: DataTypes.STRING,
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Bookings',
    }
  )
  return Bookings
}
