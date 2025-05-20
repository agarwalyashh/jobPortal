const multer = require("multer");
const AppError = require("../utils/error");
const Application = require("../models/applicantionModel");

const multerStorage = multer.diskStorage({});

const upload = multer({ storage: multerStorage });
exports.uploadCompanyLogo = upload.single("image");

exports.getAllApplicants = async (req, res, next) => {
  try {
    // figure out companyId
    const applicants = await Application.find({ company: companyId }); // populate
    res.status(200).json({
      status: "success",
      data: {
        data: applicants,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );
    if (!application) return next(new AppError("Application Not Found", 404));
    res.status(201).json({
      status: "success",
      data: application,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.updateVisibility = async (req, res, next) => {
  try {
    const { visibility } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { active: visibility },
      { new: true }
    );
    if (!application) return next(new AppError("Application Not Found", 404));
    res.status(201).json({
      status: "success",
      data: application,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
