const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minlength: 1,
    required: true,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin : String,
});

const owner = mongoose.model("owner", ownerSchema);
module.exports = owner;
