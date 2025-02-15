const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discout: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
});

const product = mongoose.model("product", productSchema);
module.exports = product;
