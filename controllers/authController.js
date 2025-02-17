const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const dbgr = require("debug")("development:indexRoute");
const cookieparser = require("cookie-parser");
const ownerModel = require("../models/owner.model");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  let { email, password, fullname } = req.body;
  let flag = await userModel.find({ email });
  if (flag && flag.length > 0) {
    req.flash("error", "Already have an account login first");
    return res.redirect("/");
  }
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
    const hash = await bcrypt.hash(password, salt);

    let user = await userModel.create({
      email,
      fullname,
      password: hash,
    });

    let token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let flag = await userModel.findOne({ email: email });
  if (!flag) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/");
  }
  bcrypt.compare(password, flag.password, function (err, result) {
    if (!result) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/");
    }
    let token = generateToken(flag);
    res.cookie("token", token, {
      //   httpOnly: true,
      //   secure: true,
      //   maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("/shop");
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

const loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let flag = await ownerModel.findOne({ email });

    if (!flag || !flag.password) {
      return res.status(401).render("error", {
        title: "Error 401",
        message: "Invalid email or password",
      });
    }
    let isMatch = await bcrypt.compare(password, flag.password);
    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/owner");
    }
    let token = generateToken(flag);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).redirect("/owner/panel");
  } catch (err) {
    res.status(500).render("error", {
      title: "Error 500",
      message: "Internal Server Error",
    });
  }
};

const createAdmin = async (req, res) => {
  let { email, password, fullname } = req.body;
  try {
    let owners = await ownerModel.find({});
    if (owners.length > 2) {
      return res.status(503).render("error", {
        title: "Error 503",
        message: "You can't create a new admin!\nAdmin Limit reached",
      });
    }
    let flag = await ownerModel.findOne({ email });
    if (flag)
      return res.status(400).render("error", {
        title: "Error 400",
        message: "Admin already exists",
      });
    const saltRounds = parseInt(process.env.SALTROUNDS) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    let createdAdmin = await ownerModel.create({
      email,
      password: hash,
      fullname,
    });
    res.status(201).redirect("/owner");
  } catch (err) {
    res.status(500).render("error", {
      title: "Error 500",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginAdmin,
  createAdmin,
};
