const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Sorry, please login first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel.find({email : decoded.email})
    .select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("Error" , "Something went wrong")
    res.redirect("/")
  }
};
