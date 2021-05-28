const mongoose = require('mongoose');
const Post = require("../models/post");

async function addPost (req,res){
    try{
        let imageUrl = "";
        const {description} = req.body;
        if(req.file){
            imageUrl = 'http://localhost:3000/images/' + req.file.filename;
        }
        const newPost = {
            description : description,
            imageUrl : imageUrl
        };

        const post  = new Post(newPost);
        await post.save();
        res.status(200).send({success : "true", result : post});
    }catch(err){
        return res.status(500).send({success : "false",mesg:err});
    }
    
}

async function likePost (req,res){
    try{
        const postId = req.params.id; // Get post Id from front-end
        const userId = mongoose.Types.ObjectId(res.locals.id);

        const post = await Post.findOne({_id : postId});
        
        if( post.likes.indexOf(userId) === -1){ // Only one like per user
            post.likes.push(userId);
        }
        
        
        await post.save();
        res.status(200).send({success : "true", result : post});
    }catch(err){
        console.log(err);
        return res.status(500).send({success : "false",mesg:err});
    }
}

async function commentPost (req,res){
    try{
        const postId = req.params.id; // Get post Id from front-end
        const content = req.body.comment;
        const userId = mongoose.Types.ObjectId(res.locals.id);

    }catch(err){
        return res.status(500).send({success : "false",mesg:err});
    }
}

module.exports = {addPost, likePost, commentPost};