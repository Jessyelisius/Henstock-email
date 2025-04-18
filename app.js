const express = require('express');
const DBconnection = require('./config/dbconn');
require('dotenv').config();

const app = express();
const port = 3001;
DBconnection();

/////email route


app.listen(port, () => console.log(`App listening on port ${port}`));