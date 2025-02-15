const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contant: Number,
  picture: String,
});

const user = mongoose.model("owner", userSchema);
module.exports = user;
