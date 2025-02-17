const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : "product",
  }],
  orders: {
    type: Array,
    default: [],
  },
  contant: Number,
  picture: String,
});

const user = mongoose.model("user", userSchema);
module.exports = user;
