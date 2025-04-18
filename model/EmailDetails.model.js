const mongoose = require('mongoose');

const Emailschema = new mongoose.Schema({
    Subject:{
        type:String,
        required:[true, 'Title is required']
    },
    Body:{
        type:String,
        required:[true,'Subject is required']
    },
    Email:{
        type:String,
        required:[true, 'Email is required']
    },
    SentAt:{
        type:Date
    }

},{timestamps:true});

module.exports  = mongoose.model('Email', Emailschema);