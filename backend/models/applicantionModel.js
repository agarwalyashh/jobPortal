const mongoose = require("mongoose");

const applicantsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
      required: true,
    },
    job: {
      type: mongoose.Schema.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    appliedAt:{
      type:Date,
      default:Date.now()
    }
  },
  {
    timestamps: true,
  }
);

applicantsSchema.index({ job: 1, user: 1 }, { unique: true });

const Application = mongoose.model("Application", applicantsSchema);
module.exports = Application;
