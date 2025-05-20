const express = require("express");
const companyController = require("../controllers/companyController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(companyController.uploadCompanyLogo,authController.signup)
router.route("/login").post(authController.login)


router.route("/getAllApplicants").get(companyController.getAllApplicants);
router
  .route("/updateApplicationStatus/:jobId")
  .patch(companyController.updateApplicationStatus);
router.route("/updateVisibility/:jobId").patch(companyController.updateVisibility);

module.exports = router;