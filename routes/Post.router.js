const router = require("express").Router();

const imageUpload = require('../middlewares/imageUpload')
const authrorize = require('../middlewares/authorize');
//import controllers
const { addPost, likePost, commentPost} = require('../controllers/Post.controller');
 

router.post("/newPost", imageUpload, addPost );

router.post("/like/:id",authrorize, likePost );

router.post("/comment/:id", commentPost );

module.exports = router;