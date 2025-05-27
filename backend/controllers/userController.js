const AppError = require("../utils/error");
const Application = require("../models/applicantionModel");
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

const multerStorage = multer.diskStorage({});
const upload = multer({ storage: multerStorage });
exports.uploadResume = upload.single("resume");

exports.getAppliedJobs = async (req, res, next) => {
  try {
    const user = await User.findOne({ userID: req.auth.userId });
    if (!user) return next(new AppError("User not found", 404));
    const data = await Application.find({ user: user._id })
      .populate({
        path: "job",
        select: "title description salary location level category",
      })
      .populate({
        path: "company",
        select: "name email image",
      });
    if (!data)
      return next(new AppError("No applications found for this user", 404));
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
    const { jobId } = req.params;
    const jobData = await Job.findById(jobId);
    const userData = await User.findOne({ userID: req.auth.userId });
    const response = {
      user: userData._id,
      company: jobData.company,
      job: jobId,
    };
    const application = await Application.create(response);
    res.status(201).json({
      status: "success",
      data: application,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return next(new AppError("User not found", 404));
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateResume = async (req, res, next) => {
  try {
    const resume = req.file;
    if (!resume) {
      return next(new AppError("Resume file is required", 400));
    }
    const resumeUpload = await cloudinary.uploader.upload(resume.path);
    const user = await User.findOneAndUpdate(
      { userID: req.auth.userId },
      { resume: resumeUpload.secure_url },
      { new: true, runValidators: true }
    );
    if (!user) return next(new AppError("User not found", 404));
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
