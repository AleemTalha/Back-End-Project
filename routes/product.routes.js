const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config")
const productModel = require("../models/product.model");

router.post("/create",upload.single("image") ,async(req, res) => {
  try
  {
    const {name , price , discount } = req.body; 
   let product = await productModel.create({
    name,
    price,
    discount,
    image:req.file.buffer
   })
   req.flash("success" , "Product created successfully");
   res.redirect("/owner/admin");
  }
  catch(err)
  {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
