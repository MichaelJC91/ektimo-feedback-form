var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    moment      = require("moment-timezone"),
    minify      = require('express-minify'),
    autoprefixer = require('express-autoprefixer'),
    root = '/public/stylesheets';
    
//Routes
var indexRoute = require("./routes/index");

//Set View Engine Template
app.set("view engine", "ejs");

//Express Minify
app.use(minify());

//Auto Prefixer
app.use(autoprefixer({ browsers: 'last 2 versions', cascade: false }));

//Set directory of Style Sheet
app.use(express.static(__dirname + "/public"));


//Mongoose Directory For Local Enviroment
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));

//Use moment.js library across all files
app.locals.moment = moment;

//Route of index page
app.use(indexRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(process.env.DATABASEURL);
    console.log("App Has Started!");
});