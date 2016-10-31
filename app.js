var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    Feedback    = require("./models/feedback");

//Set View Engine Template
app.set("view engine", "ejs");

//Set directory of Style Sheet
app.use(express.static(__dirname + "/public"));

//Mongoose Directory
// mongoose.connect("mongodb://localhost/ektimo_feedback_form");
mongoose.connect("mongodb://michael:comics1991@ds139277.mlab.com:39277/ektimo_feedback_form");

app.use(bodyParser.urlencoded({extended: true}));

//Get Feedback Form
app.get("/", function(req, res){
    res.render("feedback");
});

//Create New Feedback
app.post("/", function(req, res){
    //Get data from form and add to campgrounds array
    var companyName = req.body.companyName,
        rating      = req.body.rating,
        name        = req.body.name,
        reason      = req.body.reason,
        post        = req.body.postToWebsite,
        chooseName  = req.body.chooseName;
        
    //Create new feedback form with above variables ^^
    var newFeedbackForm = {
        
        companyName: companyName,
        rating: rating,
        name: name,
        reason: reason,
        postToWebsite: post,
        websiteAppear: chooseName
        
    };
    
    //Save Feedback form to DB
    Feedback.create(newFeedbackForm, function(err){
        if(err) {
            console.log(err);
        }   else {
            res.redirect("/feedback-data");
        }
    });
});

//Get Feedback JSON Data
app.get("/feedback-data", function(req, res){
    Feedback.find({}, function(err, foundFeedback){
        if(err) {
            console.log(err);
        } else {
            res.json({feedback: foundFeedback});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App Has Started!");
});