require('dotenv').config();

const roles = {
  patient:'PATIENT',
  secretary:'SECRETARY',
  doctor:'DOCTOR'

};

const status = {
 pending:"PENDING",
 passed:"PASSED",
 missed:"MISSED",
 reshedule:"RESHEDULE"
};

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
const date = day+month+date_ob.getFullYear() 


module.exports = { roles, date, status}

