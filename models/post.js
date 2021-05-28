const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

const postSchema = new mongoose.Schema({
   description : {
       type : String,
       required : true
   },
   imageUrl : {
       type : String,
       required : false
   },
   likes : [{ type : mongoose.Schema.Types.ObjectId}], // array if user IDs
   comments : [commentSchema]
});

module.exports = mongoose.model("Post", postSchema);