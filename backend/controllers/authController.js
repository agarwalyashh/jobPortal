const Company = require("../models/companyModel");
const AppError = require("../utils/error");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v2: cloudinary } = require("cloudinary");

exports.signup = async (req, res, next) => {
  try {
    if (req.file) req.body.photo = req.file.filename;
    else return next(new AppError("Image is needed", 404));
    const logoUpload = await cloudinary.uploader.upload(req.file.path);
    const newRecruiter = await Company.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: logoUpload.secure_url, // req.body.photo
    });
    const token = jwt.sign({ id: newRecruiter._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    newRecruiter.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        recruiter: newRecruiter,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Please enter email and password", 400));

    const recruiter = await Company.findOne({ email: email }).select(
      "+password"
    );

    if (
      !recruiter ||
      !(await recruiter.correctPassword(password, recruiter.password))
    )
      return next(new AppError("Incorrect credentials", 401));

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    recruiter.password = undefined;
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
