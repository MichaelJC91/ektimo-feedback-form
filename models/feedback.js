var mongoose = require("mongoose");

//Feedback Mongoose SCHEMA
var feedbackSchema = new mongoose.Schema({
    companyName: String,
    rating: Number,
    name: String,
    reason: String,
    websiteAppear: String,
    services: Array,
    servicesContact: { type: String, default: "No, please don't contact me" },
    date: {type: String, required: true}
});

module.exports = mongoose.model("Feedback", feedbackSchema);
