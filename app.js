const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//Global Variables  :
const port = process.env.PORT;
const host = process.env.HOST;

//Routes Variables 
const ownerRoute = require("./routes/owner.routes")
const userRoute = require("./routes/user.routes")
const productRoute = require("./routes/product.routes")

//Exported Files here  :
const db = require("./config/mongoose-connection");

//Use Middlewares here
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Route Middle-Ware here  :
app.use("/owner" , ownerRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);

//Set Commands here
app.set("view engine", "ejs");

//Now routes here
app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, host, () => {
  console.log("https://" + host + ":" + port);
});
