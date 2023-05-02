'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Doctor_Info extends Model {
    static associate(models) {
      Doctor_Info.belongsTo(models.User, { foreignKey: 'doctorId' }),
        Doctor_Info.belongsTo(models.Allcodes, {
          foreignKey: 'priceId',
          targetKey: 'keyMap',
          as: 'priceTypeData',
        }),
        Doctor_Info.belongsTo(models.Allcodes, {
          foreignKey: 'paymentId',
          targetKey: 'keyMap',
          as: 'paymentTypeData',
        }),
        Doctor_Info.belongsTo(models.Allcodes, {
          foreignKey: 'provinceId',
          targetKey: 'keyMap',
          as: 'provinceTypeData',
        })
    }
  }
  Doctor_Info.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Doctor_Info',
      freezeTableName: true,
    }
  )
  return Doctor_Info
}
