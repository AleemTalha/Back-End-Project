const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");

//Global Variables  :
const port = process.env.PORT;
const host = process.env.HOST;

//Routes Variables 
const ownerRoute = require("./routes/owner.routes")
const userRoute = require("./routes/user.routes")
const productRoute = require("./routes/product.routes")
const indexRoute = require("./routes/index.routes");

//Exported Files here  :
const db = require("./config/mongoose-connection");
const isLoggedIn = require("./middlewares/isLoggedIn");

//Use Middlewares here
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
  })
)
app.use(flash());

//Set Commands here
app.set("view engine", "ejs");

//Route Middle-Ware here  :
app.use("/owner" , ownerRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/",indexRoute);

app.get("/header",isLoggedIn,(req,res)=>{
  res.render("header" , { loggedin : true});
})

app.listen(port, host, () => {
  console.log("https://" + host + ":" + port);
});
