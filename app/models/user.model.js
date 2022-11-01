const { roles }= require('../controllers/constants.js');

module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define( "user", {
      id: {
      type: DataTypes.INTEGER,
       autoIncrement: true,
      primaryKey: true,
       allowNull: false
    },
    names: {
           type: DataTypes.STRING,
           allowNull: false
       },
       email: {
           type: DataTypes.STRING,
           unique: true,
           isEmail: true, //checks for email format
           allowNull: false
       },
       password: {
           type: DataTypes.STRING,
           allowNull: false,
       },
        address: {
      type: DataTypes.STRING,
       allowNull: false
    },
   city: {
      type: DataTypes.STRING,
       allowNull: false
    },
    number: {
      type: DataTypes.STRING,
       allowNull: false
    },
     phone: {
      type: DataTypes.STRING,
       allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
       allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
       allowNull: false
    },
     role: {
      type: DataTypes.STRING,
       allowNull: false,
       defaultValue:roles.patient
    }
   }, {timestamps: true}, )
   return User
}