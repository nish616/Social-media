const express = require("express");
const path = require('path');
const cors = require("cors");
var morgan = require('morgan')
require("dotenv").config();

//require Db connection
require("./db/db.Connection");

//import routes
const authRoute = require("./routes/Authentication.router");
const postRoute = require('./routes/Post.router');


const app = express();

//express middleware
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/images', express.static(path.join(__dirname,'./images')));

//Routes
app.use("/", authRoute);
app.use("/posts", postRoute);




let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, console.log(`Listening at port ${port} `));