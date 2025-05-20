const AppError = require("../utils/error");
const Job = require("../models/jobModel");

exports.getAllJobs = async (req, res, next) => {
  try {
    const data = await Job.find().populate({
      active: true,
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
    const data = await Job.findById(req.params.id).populate({
      active: true,
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

exports.getJobsByCompany = async(req,res,next)=>{
    try{
        const data = await Job.findBy({company:companyId}) // populate and figure out companyId
        if(!data)
            return next(new AppError("Jobs not found",404));
        res.status(200).json({
            status:"success",
            data:{
                jobs:data
            }
        })
    }
    catch(err){
        next(new AppError(err.message,400,err))
    }
}

exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
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
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return next(new AppError("Job not found", 404));
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return next(new Error("Job not found", 404));
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
