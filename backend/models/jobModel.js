const mongoose = require("mongoose");
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
    ],
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

const Job = mongoose.model("Job", jobSchema);
exports.Job = Job;
