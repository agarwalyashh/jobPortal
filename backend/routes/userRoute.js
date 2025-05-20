const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/getAppliedJobs").get(userController.getAppliedJobs);
router.route("/createJobApplication/:jobId").post(userController.createJobApplication);

module.exports = router;
