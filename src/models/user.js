'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcodes, {
        foreignKey: 'positionId',
        targetKey: 'keyMap',
        as: 'positionData',
      }),
        User.belongsTo(models.Allcodes, {
          foreignKey: 'gender',
          targetKey: 'keyMap',
          as: 'genderData',
        })
      User.hasMany(models.Schedule, {
        foreignKey: 'doctorId',
        as: 'doctorData',
      }),
        User.hasMany(models.Bookings, {
          foreignKey: 'patientId',
          as: 'patientData',
        }),
        User.hasOne(models.Markdown, { foreignKey: 'doctorId' }),
        User.hasOne(models.Doctor_Info, { foreignKey: 'doctorId' })
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleId: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      positionId: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
