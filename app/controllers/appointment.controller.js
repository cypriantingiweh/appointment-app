const db = require("../models");
const Appointments = db.appointment;
const { date }= require('../controllers/constants.js');
const User = db.user;


const Op = db.Sequelize.Op;

// Create and Save a new Appointment
exports.create = async(req, res) => { 
    try{
      const{comment_before, comment_after, status, appointment_date, appointment_time, request_date, doctor, userId} = req.body;

      const payload ={comment_before, comment_after, status, appointment_date, appointment_time, request_date, doctor, userId};

      const appointment  = await Appointments.create(payload);

       appointment.appointment_code =  `A${appointment.id}${date}`
      
      Appointments.update({appointment_code:appointment.appointment_code }, { where: { id: appointment.id } })

      res.send(appointment);

    }catch(error) {
         res.status(500).send({
        message: error.message | "Some error occurred while creating the Appointment."
      });
    }


};

// update a new Appointment
exports.update = (req, res) => { 

  const { id, comment_before, comment_after, status, appointment_date, appointment_time, request_date} = req.body;

  const appointment ={comment_before, comment_after, status, appointment_date, appointment_time, request_date};
  
  // update appointment in the database
Appointments.update(appointment, { where: { id: id } })
  .then(result =>res.send(result))
  .catch(err =>handleError(err));
};

// Retrieve all appointment from the database.
exports.findAll = async(req, res) => {
  const doctor = req.query.doctor;
  var condition = doctor ? { doctor: { [Op.iLike]: `%${doctor}%` } } : null;

  Appointments.findAll({ where: condition, include: [{ model: User, as:"user"}] }).then(data => {

console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointment."
      });
    });
};


// Find a single Appointment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointments.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Appointment with id=" + id
      });
    });
};
