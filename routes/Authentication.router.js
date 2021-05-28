const router = require("express").Router();

const imageUpload = require('../middlewares/imageUpload')

//import controllers
const Authenticate  = require("../Controllers/Authentication.controller"); 

router.post("/register", imageUpload,  Authenticate.register);

router.post("/login", Authenticate.login);



module.exports = router;