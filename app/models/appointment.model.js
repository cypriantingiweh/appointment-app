const {  status }= require('../controllers/constants.js');
const db = require("./index");
const User = db.user;

module.exports = (sequelize, Sequelize) => {
  const  Appointment = sequelize.define("appointment", {
     id: {
      type: Sequelize.INTEGER,
       autoIncrement: true,
      primaryKey: true,
       allowNull: false
    },
    appointment_code:{
      type:Sequelize.STRING,
      allowNull: true
    },
    comment_before: {
      type: Sequelize.STRING
    },
    comment_after: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING,
       allowNull: false,
       defaultValue: status.pending
    },
    appointment_date: {
      type: Sequelize.STRING,
       allowNull: false
    },
     appointment_time: {
      type: Sequelize.STRING,
       allowNull: false
    },
    request_date: {
      type: Sequelize.STRING,
       allowNull: false
    },
    doctor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    //   references: {
    //   model: User, 
    //   key: 'id'
    //  }
    },
  });

  return Appointment;
};