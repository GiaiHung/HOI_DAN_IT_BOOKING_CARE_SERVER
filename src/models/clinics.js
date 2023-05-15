'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    static associate(models) {}
  }
  Clinics.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Clinics',
    }
  )
  return Clinics
}
