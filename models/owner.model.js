const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  email: String,
  password: String,
  isAdmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin : String,
});

const owner = mongoose.model("user", ownerSchema);
module.exports = owner;
