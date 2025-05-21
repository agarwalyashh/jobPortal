const express = require("express");
const companyController = require("../controllers/companyController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(companyController.uploadCompanyLogo,authController.signup)
router.route("/login").post(authController.login)

router.use(authController.protect)
router.route("/").get(companyController.getCompany)
router.route("/allApplicants").get(companyController.getAllApplicants);
router
  .route("/applicationStatus/:jobId")
  .patch(companyController.updateApplicationStatus);


module.exports = router;