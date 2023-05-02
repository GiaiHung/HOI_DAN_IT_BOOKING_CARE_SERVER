'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Histories extends Model {
    static associate(models) {}
  }
  Histories.init(
    {
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      files: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Histories',
    }
  )
  return Histories
}
