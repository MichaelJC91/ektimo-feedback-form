var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    Feedback    = require("./models/feedback");

//Set View Engine Template
app.set("view engine", "ejs");

//Set directory of Style Sheet
app.use(express.static(__dirname + "/public"));

// seedDB();
//Mongoose Directory
mongoose.connect("mongodb://localhost/ektimo_feedback_form");


app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

//Get Feedback Form
app.get("/feedback", function(req, res){
    res.render("feedback");
});

//Create New Feedback
app.post("/feedback", function(req, res){
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