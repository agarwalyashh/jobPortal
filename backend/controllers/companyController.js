const multer = require("multer");
const AppError = require("../utils/error");
const Application = require("../models/applicantionModel");
const Company = require("../models/companyModel");

const multerStorage = multer.diskStorage({});

const upload = multer({ storage: multerStorage });
exports.uploadCompanyLogo = upload.single("image");

exports.getAllApplicants = async (req, res, next) => {
  try {
    const applicants = await Application.find({
      company: req.company.companyId,
    });
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


exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.company._id);
    if (!company) return next(new AppError("No such company exists", 404));
    res.status(200).json({
      status: "success",
      data: company,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
