const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const origin = {
  origin:'*'
}

app.use(cors(origin))

// Start server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening`)
})

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Patient Appointment application." });
});

require("./app/routes/appointment.routes")(app);

require("./app/routes/user.routes")(app);

