module.exports = app => {
  const appointments = require("../controllers/appointment.controller.js");

  var router = require("express").Router();

  // Create a new appointment
  router.post("/appointment", appointments.create);

  // Retrieve all appointment
  router.get("/appointment", appointments.findAll);

    // update appointment
  router.put("/appointment/update", appointments.update);

   // Retrieve a single Doctors with id
  router.get("/appointment/:id", appointments.findOne);
  app.use('/api', router);
};
