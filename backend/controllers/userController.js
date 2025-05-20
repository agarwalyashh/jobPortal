const AppError = require("../utils/error");
const Application = require("../models/applicantionModel");

exports.getAppliedJobs = async (req, res, next) => {
  try {
    // Figure out userId
    const data = await Application.find({ user: userId }); // populate 
    res.status(200).json({
      status: "success",
      data: {
        jobs: data,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.createJobApplication = async (req, res, next) => {
  try {
    const {jobId,companyId} = req.body;
    const response = {
        user:userId, //figure out
        company:companyId,
        job:jobId,
    }
    const application = await Application.create(response);
    res.status(201).json({
      status: "success",
      data: application,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
