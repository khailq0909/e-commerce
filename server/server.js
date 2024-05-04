const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const initRoutes = require('./routes'); 

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use('/', (req,res)=>{res.send("SERVER RUNNING")});
dbConnect()
initRoutes(app);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});