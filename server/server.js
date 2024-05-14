const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const initRoutes = require("./routes");
const cors = require("cors");
const passport = require('passport');
const googleAuth = require("./config/googleAuth");
const session = require('express-session');


const app = express();
const port = process.env.PORT || 8000;

// Initialize Passport
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  next();
});

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
googleAuth();
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})

dbConnect();
initRoutes(app);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
