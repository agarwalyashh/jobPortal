const express = require("express");
const jobController = require("../controllers/jobController");

const router = express.Router();

router.route("/deleteJob").delete(jobController.deleteJob);
router.route("/updateJob").patch(jobController.updateJob);
router.route("/createJob").post(jobController.createJob);
router.route("/getAllJobs").get(jobController.getAllJobs);
router
  .route("/getJobsByCompany/:companyId")
  .get(jobController.getJobsByCompany);
router.route("/getJob/:jobId").get(jobController.getJob);

module.exports = router;
