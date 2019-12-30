const User = require("../models/User");
const jwt = require("jsonwebtoken"); //to generate singed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

//SignUp User
exports.signUp = (req, res) => {
  // console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        // error: errorHandler(error)
        error: "Email is already exist"
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

//SignIn User
exports.signIn = (req, res) => {
  //find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with the email does not exist.Please signup "
      });
    }
    //if user is found make sure the email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match "
      });
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, "dtffuydytfjhdd");
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//SignOut user
exports.signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "SignOut Success" });
};

//Protecting Route or Authorization Check
exports.requireSignin = expressJwt({
  secret: "dtffuydytfjhdd",
  userProperty: "auth"
});

//IsAuth or Regular User route Protect
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied"
    });
  }
  next();
};

//Admin Route Protect
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse!Access denied"
    });
  }
  next();
};
