const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: Number,
  bgColor: String,
  panelColor: String,
  textColor: String,
});

const product = mongoose.model("product", productSchema);
module.exports = product;
