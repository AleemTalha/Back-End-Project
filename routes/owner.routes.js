const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");
const dbgr = require("debug")("development:admin");
const { loginAdmin , createAdmin } = require("../controllers/authController");

if (process.env.NODE_ENV == "development") {
  router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("adminlogin" , {error});
  });
  router.post("/create", createAdmin);
  router.post("/login", loginAdmin);
  router.get("/panel",(req,res)=>{
    let error = req.flash("error");
    res.render("adminPanel" , {error})
  })
} else {
  router.use((req, res) => {
    dbgr("Unauthorized access");
    res.status(403).render("error", {
      title: "Error 403!",
      message: "You do not have permission to access the requested resource.",
    });
  });
}
module.exports = router;