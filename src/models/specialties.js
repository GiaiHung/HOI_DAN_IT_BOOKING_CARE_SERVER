'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {}
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Specialty',
    }
  )
  return Specialty
}
