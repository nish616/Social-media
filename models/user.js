const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    },

    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    bio : {
        type : String,
        required : false
    },
    imageUrl : {
        type : String,
        required : false
    },
    posts : [{ type : mongoose.Schema.Types.ObjectId, ref :'Post'}]  
});

module.exports = mongoose.model('User', userSchema);