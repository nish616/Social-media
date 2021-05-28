const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

//require environment variables
const {secret} = require("../config/jwt.token");

//Import user model
const User =  require("../models/user");

 async function register (req,res) {
     try{
        let imageUrl = "";
        const {name,email, password, age, bio } = req.body;
        if(req.file){
            imageUrl = 'http://localhost:3000/images/' + req.file.filename;
        }
        
        if(!name || !email || !password){
            return res.status(400).send({success : "false",mesg:"fields are empty"});
        }

        //check if user already exists
        const userExist = await User.findOne({email : email});
        if(userExist) return res.status(400).send({success : "false", mesg:"User already registered"});

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = {
            name : name,
            email : email,
            password : hashedPassword,
            age : age,
            bio : bio,
            imageUrl : imageUrl
        };

        const user  = new User(newUser);
        await user.save();

        const payload = {
            id : user._id,
            name : user.name,
            email : user.email
        };
        const accessToken = jwt.sign(payload, secret, {expiresIn: '120m'});
        
        res.status(200).send({success : "true","token" : accessToken});
    
    }catch(err){
        if(err){
            return res.status(500).send({success : "false",mesg:err});
            console.log(err);
        }
    }
       
}

 async function login (req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({success : "false",mesg:"fields are empty"});
        }
        //check if user  exists
        const user = await User.findOne({email : email});
        if(user == null) return res.status(400).send({success : "false",mesg:"Invalid user name/password"});

        //password check

        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) return res.status(400).send({success : "false",mesg:"Invalid user name/password"});

        //create and assign token with role_id
        const payload = {
            id : user._id,
            name : user.name,
            email : user.email
        };
        const accessToken = jwt.sign(payload, secret, {expiresIn: '120m'});
        
        res.status(200).json({success : "true","token" : accessToken});

    }catch(err){
        console.log(err);
        return res.status(500).send({success : "false",mesg:err});
    }
    
    
}

module.exports = { register, login} ;