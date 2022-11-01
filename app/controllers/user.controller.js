//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.user;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
 try {
   const { 
    names, 
    email, 
    password,
    address,
    city,
    number,
    phone,
    sex,
    age,
    role
   } = req.body;

   console.log(req.body.password);
   const data = {
     names,
     email,
     password:await bcrypt.hash(number, 4),
     address,
     city,
     number,
     phone,
     sex,
     age,
     role
   };
   //saving the user
   const user = await User.create(data);

   if (user) {
     let token = jwt.sign({ id: user.id }, "medical_appointment_app", {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     user.password = token

     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};


//login authentication

const login = async (req, res) => {
 try {
const { email, password } = req.body;

   //find a user by their email
   const user = await User.findOne({ email });

   //if user email is found, compare password with bcrypt
   if (user) {
           
     const isSame = await bcrypt.compare(req.body.password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id,email:user.email }, "medical_appointment_app", {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       user.password = token
       //send user data
       return res.status(201).send(user);
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

// update a new user
const update = (req, res) => { 

  const { id,  names,email,address,city,number, phone,sex,age} = req.body;
  const user ={names,email,address,city,number, phone,sex,age};
  
  // update user in the database
User.update(user, { where: { id: id } })
  .then(result =>res.send(result))
  .catch(err =>handleError(err));
};

module.exports = {
 signup,
 login,
 update
};