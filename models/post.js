const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,

    }
});

const postSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
   description : {
       type : String,
       required : true
   },
   imageUrl : {
       type : String,
       required : false
   },
   likes : [{ type : mongoose.Schema.Types.ObjectId}], // array of user IDs
   comments : [commentSchema]
});

module.exports = mongoose.model("Post", postSchema);