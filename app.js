const express = require('express');
const DBconnection = require('./config/dbconn');
require('dotenv').config();

const app = express();
const port = 3001;
DBconnection();

///////middleware///////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));


/////email route
app.use('/', require('./routes/email'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});