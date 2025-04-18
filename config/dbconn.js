const mongoose = require('mongoose');


const DBconnection = async() => {
    try {
        let conn = await mongoose.connect(process.env.dbconn);
        console.log("database connected");
    } catch (error) {
        console.log('error connecting to database',error);
        process.exit(1);
    }
}

module.exports = DBconnection;