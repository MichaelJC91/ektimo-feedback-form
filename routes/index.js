var express     = require("express"),
    router      = express.Router(),
    Feedback    = require("../models/feedback"),
    moment      = require("moment-timezone"),
    date        = moment().tz("Australia/Melbourne").format("Do MMM, YYYY"),
    xmlify = require('xmlify');
    
//Root Route (Feedback Form)
router.get("/", function(req, res){
    res.render("feedback");
});

//Thank You Page
router.get("/thank-you", function(req, res){
    res.render("thank-you");
});

//Create New Feedback
router.post("/", function(req, res){
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
        websiteAppear: chooseName,
        date: date
        
    };
    
    //Save Feedback form to DB
    Feedback.create(newFeedbackForm, function(err){
        if(err) {
            console.log(err);
        }   else {
            res.redirect("thank-you");
        }
    });
});

//Get Feedback JSON Data
router.get("/feedback-data", function(req, res){
    Feedback.find(function(err, foundFeedback){
        if(err) {
            console.log(err);
        } else {
            res.set('Content-Type', 'text/xml');
            var obj = foundFeedback;
            res.send(xmlify(obj, "feedback"));
        }
    });
});

module.exports = router;