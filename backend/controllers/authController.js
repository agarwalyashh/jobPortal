const Company = require("../models/companyModel");
const AppError = require("../utils/error");
const jwt = require("jsonwebtoken");
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
      image: logoUpload.secure_url,
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

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1. Getting token & checking if it is there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token)
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      );
    // 2. Verify the token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    }).catch((err) => {
      return next(new AppError("Invalid or expired token", 401, err));
    });
    const currentRecruiter = await Company.findById(decoded.id);
    if (!currentRecruiter) {
      return next(
        new AppError("The recruiter belonging to this token does not exist", 401)
      );
    }
    if (currentRecruiter.changedPasswordAfter(decoded.iat))
      return next(
        new AppError("Recruiter recently changed password. Please Login Again.", 401)
      );
    req.company = currentRecruiter;
    next();
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    const token = req.cookies.jwt;
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    }).catch(() => {
      return null;
    });

    if (!decoded) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    const currentRecruiter = await User.findById(decoded.id);
    if (!currentRecruiter) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    if (currentRecruiter.changedPasswordAfter(decoded.iat)) {
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
      });
    }

    return res.status(200).json({
      status: "success",
      isLoggedIn: true,
      company: currentRecruiter,
    });
  } catch (err) {
    return res.status(200).json({
      status: "success",
      isLoggedIn: false,
    });
  }
};