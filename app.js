var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    moment      = require("moment-timezone");
    
//Routes
var indexRoute = require("./routes/index");



//Set View Engine Template
app.set("view engine", "ejs");

//Set directory of Style Sheet
app.use(express.static(__dirname + "/public"));

//Mongoose Directory
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));

//Use moment.js library across all files
app.locals.moment = moment;

//Route of index page
app.use(indexRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App Has Started!");
});