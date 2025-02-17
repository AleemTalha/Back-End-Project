const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose")

require("dotenv").config();
mongoose.connect(`${config.get("MONGODB_URI")}/shop`)
.then(()=>{
    dbgr("Connected to Database");
})
.catch((err)=>{
    dbgr(err)
})

module.exports = mongoose.connection;