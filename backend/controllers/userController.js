const AppError = require("../utils/error");
const Application = require("../models/applicantionModel");
const User = require("../models/userModel");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

const multerStorage = multer.diskStorage({});
const upload = multer({ storage: multerStorage });
exports.uploadResume = upload.single("resume");

exports.getAppliedJobs = async (req, res, next) => {
  try {
    const data = await Application.find({ user: req.auth.userId })
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
    const { jobId, companyId } = req.body;
    const response = {
      user: req.auth.userId,
      company: companyId,
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
    const user = await User.findByIdAndUpdate(
      req.auth.userId,
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
