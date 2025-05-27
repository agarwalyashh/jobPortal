const express = require("express");
const jobController = require("../controllers/jobController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(jobController.getAllJobs);
router.route("/:jobId").get(jobController.getJob);
router
  .route("/jobsByCompany/:companyId")
  .get(jobController.getJobsByCompany);

router.use(authController.protect);
router.route("/:jobId").delete(jobController.deleteJob);
router.route("/:jobId").patch(jobController.updateJob);
router.route("/").post(jobController.createJob);
router.route("/visibility/:jobId").patch(jobController.updateVisibility);

module.exports = router;
