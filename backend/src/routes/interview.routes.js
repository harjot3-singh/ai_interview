const express = require("express");
const interviewRouter = express.Router();

const authMiddleWare = require("../middlewares/auth.middleWare.js");
const {
    generateInterviewReportController,
    generateInterviewReportByIdController,
    getAllInterviewReportsController
} = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware.js");

interviewRouter.post(
    "/",
    authMiddleWare.authUser,
    upload.single("resume"),
    generateInterviewReportController
);
interviewRouter.get("/report/:interviewId", authMiddleWare.authUser, generateInterviewReportByIdController)
interviewRouter.get("/", authMiddleWare.authUser, getAllInterviewReportsController)

module.exports = interviewRouter;