const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: (value) => {
        return validator.isEmail(value);
      },
      message: ["Email is not valid"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: 8,
      message: ["Password must be at least 8 characters"],
      select: false,
    },
    passwordChangedAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

companySchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined 

    if(!this.isNew)
        this.passwordChangedAt = Date.now()-1000;
    next()
})

companySchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

companySchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp<changedTimeStamp
    }
    return false;
}

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
