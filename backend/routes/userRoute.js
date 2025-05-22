const express = require("express");
const { requireAuth } = require('@clerk/express')
const userController = require("../controllers/userController");

const router = express.Router();

router.use(requireAuth())
router.route("/").get(userController.getUser)
router.route("/jobs").get(userController.getAppliedJobs);
router.route("/:jobId").post(userController.createJobApplication);
router.route("/resume").patch(userController.uploadResume,userController.updateResume)

module.exports = router;
