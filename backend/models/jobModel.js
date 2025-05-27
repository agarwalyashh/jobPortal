const mongoose = require("mongoose");
const Application = require("../models/applicantionModel")

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
    trim: true,
  },
  keyResponsibilities:{
    type:String,
    required:[true,"Please mention some responsibilities"]
  },
  skillsRequired:{
    type:String,
    required:[true,"Skills are required"]
  },
  category: {
    type: String,
    required: [true, "Job category is required"],
    trim: true,
    enum: [
      "Programming",
      "Designing",
      "Marketing",
      "Management",
      "Cyber Security",
      "Data Science",
      "Networking",
    ],
  },
  location: {
    type: String,
    required: [true, "Job location is required"],
    trim: true,
    enum: [
      "Bangalore",
      "Delhi",
      "Hyderabad",
      "Mumbai",
      "Gurgaon",
      "Chennai",
      "Pune",
      "Noida",
      "Kolkata",
      "Ahemdabad",
      "Jaipur",
      "Chennai"
    ],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  level: {
    type: String,
    enum: {
      values: ["Senior Level", "Beginner Level", "Intermediate Level"],
      message: "Level must be Senior,Beginner or Intermediate",
    },
    required: [true, "Level is required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

jobSchema.pre("/^find/",function(next){
  this.find({active:true})
  next()
})

jobSchema.pre("findOneAndDelete", async function (next) {
  const job = await this.model.findOne(this.getQuery());
  if (job) {
    await Application.deleteMany({ job: job._id });
  }
  next();
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
