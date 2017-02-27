var express     = require("express"),
    router      = express.Router(),
    expressSanitizer = require('express-sanitizer'),
    Feedback    = require("../models/feedback"),
    moment      = require("moment-timezone"),
    date        = moment().tz("Australia/Melbourne").format("DD/MM/YYYY HH:mm:ss"),
    xmlify      = require('xmlify');

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
    //Get data from form and add to feedback array
    const reqBody = req.body;
    const sanitizer = req.sanitize;

    let data = {
      companyName: reqBody.companyName = sanitizer(reqBody.companyName),
      rating: reqBody.rating = sanitizer(reqBody.rating),
      name: reqBody.name = sanitizer(reqBody.name),
      reason: reqBody.reason = sanitizer(reqBody.reason),
      otherServices: reqBody.serviceCheckbox,
      chooseName: reqBody.chooseName = sanitizer(reqBody.chooseName),
      servicesContact: reqBody.serviceContact = sanitizer(reqBody.serviceContact)
    }

    // Create feedback form data
    let { companyName, rating, name, reason, otherServices, chooseName, servicesContact } = data;

    //Create new feedback form with above variables ^^
    var newFeedbackForm = {

        companyName: companyName,
        rating: rating,
        name: name,
        reason: reason,
        services: otherServices,
        servicesContact: servicesContact,
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
