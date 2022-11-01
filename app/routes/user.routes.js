
module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const userAuth = require('../middleware/userAuth.js')


  var router = require("express").Router();

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, user.signup)

//login route
router.post('/login', user.login );

  // update user details
  router.put("/user/update", user.update);
app.use('/api', router);
};