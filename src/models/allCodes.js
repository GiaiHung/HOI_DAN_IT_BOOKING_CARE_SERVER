'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    static associate(models) {
      Allcodes.hasMany(models.User, {
        foreignKey: 'positionId',
        as: 'positionData',
      }),
        Allcodes.hasMany(models.User, {
          foreignKey: 'gender',
          as: 'genderData',
        }),
        Allcodes.hasMany(models.Schedule, {
          foreignKey: 'timeType',
          as: 'timeTypeData',
        }),
        Allcodes.hasMany(models.Doctor_Info, {
          foreignKey: 'priceId',
          as: 'priceTypeData',
        }),
        Allcodes.hasMany(models.Doctor_Info, {
          foreignKey: 'paymentId',
          as: 'paymentTypeData',
        }),
        Allcodes.hasMany(models.Doctor_Info, {
          foreignKey: 'provinceId',
          as: 'provinceTypeData',
        })
    }
  }
  Allcodes.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Allcodes',
    }
  )
  return Allcodes
}
