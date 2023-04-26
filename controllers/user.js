var common = require("../config/common");
var User = require("../models/user_schema");

//userlogin
module.exports.userLogin = async (req, res) => {
  // console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    // if(!user) res.status(400).send({message: "User not Found"});
    if (user.password === req.body.password) {
      const token = await common.generateToken(user);
      // console.log(token)
      res.status(200).send({
        status: 1,
        data: user,
        statuscode: 200,
        message: "Login successfully",
        token: token,
        expireTokenTime: new Date().getTime() + (60 * 60 * 1000),
      });
    } else {
      res.status(401).send({
        message: "password didn't match",
      });
    }
    
  } catch (error) {
    res.status(400).send({ error: error, message: "User not Found"})
  }
};

//addusers
module.exports.addUser = async (req, res) => {
    console.log("req.body", req.body)
    try {
      
       const exitingUser = await User.find({ email: req.body.email }) 
      console.log(exitingUser)
      if (exitingUser.length>0) return res.status(401).send({ message: "unable to signup, email already exit", responseStatus: 401, added: false });
      const user = new User(req.body);
      const data = await user.save();
      console.log("data", data)
      res.status(200).send({
        status: 1,
        message: "Registered successfully",
        data: data
      });
    } catch (error) {
      console.log(error)
      res.status(501).send({ message: "unable to signup", responseStatus: 500, added: false });
    }
  };