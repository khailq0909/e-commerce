const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const initRoutes = require('./routes'); 
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));
dbConnect()
initRoutes(app);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});