var mongoose = require("mongoose");

//Feedback Mongoose SCHEMA
var feedbackSchema = new mongoose.Schema({
    companyName: String,
    rating: Number,
    name: String,
    reason: String,
    postToWebsite: String,
    websiteAppear: String,
    date: {type: String, required: true}
});

module.exports = mongoose.model("Feedback", feedbackSchema);