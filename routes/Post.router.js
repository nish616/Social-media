const router = require("express").Router();

const imageUpload = require('../middlewares/imageUpload')
const authrorize = require('../middlewares/authorize');
//import controllers
const { addPost, likePost, commentPost} = require('../controllers/Post.controller');
 

router.post("/newPost", authorize, imageUpload, addPost );

router.post("/like/:id",authrorize, likePost );

router.post("/comment/:id", authrorize, commentPost );

module.exports = router;