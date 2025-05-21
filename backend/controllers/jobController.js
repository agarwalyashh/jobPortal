const AppError = require("../utils/error");
const Job = require("../models/jobModel");

exports.getAllJobs = async (req, res, next) => {
  try {
    const data = await Job.find().populate({
      path: "company",
    });
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

exports.getJob = async (req, res, next) => {
  try {
    const data = await Job.findById(req.params.jobId).populate({
      path: "company",
    });
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

exports.getJobsByCompany = async (req, res, next) => {
  try {
    const data = await Job.find({ company: req.params.companyId });
    if (!data) return next(new AppError("Jobs not found", 404));
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

exports.createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      level,
      salary,
      keyResponsibilities,
      skillsRequired,
    } = req.body;
    const newJob = {
      title,
      description,
      category,
      location,
      level,
      salary,
      keyResponsibilities,
      skillsRequired,
      company: req.company._id,
    };
    const job = await Job.create(newJob);
    res.status(201).json({
      status: "success",
      data: job,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete({ _id: req.params.jobId, company: req.company._id });
    if (!job) return next(new AppError("Job not found by this company", 404));
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate({ _id: req.params.jobId, company: req.company._id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return next(new Error("Job not found by this company", 404));
    res.status(200).json({
      status: "success",
      data: {
        job: job,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateVisibility = async (req, res, next) => {
  try {
    const { visibility } = req.body;
    const job = await Job.findByIdAndUpdate(
      { _id: req.params.jobId, company: req.company._id },
      { active: visibility },
      { new: true }
    );
    if (!job) return next(new AppError("Job not found by this company", 404));
    res.status(201).json({
      status: "success",
      data: job,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
