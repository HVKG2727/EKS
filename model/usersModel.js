const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true
    },
    first_name: {
        type: String,
        required: true,
        trim:true
    },
    last_name: {
        type: String,
        required: true,
        trim:true
    },
    gender: {
        type: String,
        required: true,
    },
   
    
   
}, {
    collection: "eksusers",
    timestamps: true
})

module.exports = mongoose.model("Users", Users)
