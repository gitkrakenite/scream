const express = require("express");
const router = express.Router();

const {
  createReport,
  fetchAllReports,
  likeReport,
  fetchReportBasedOnSth,
  deleteReport,
  commentOnReport,
  fetchSpecificReport,
  updateSpecificReport,
  fetchResolvedReports,
} = require("../controllers/reportController");

router.post("/create", createReport); //create report
router.put("/edit/:id", updateSpecificReport); // edit report
router.get("/all", fetchAllReports); // see all reports
router.delete("/delete/:id", deleteReport); // delete report
router.get("/specific/:id", fetchSpecificReport); //specific report
router.post("/comment/:id", commentOnReport); //comment on report
router.post("/like/:id", likeReport); //like report
router.post("/cat", fetchReportBasedOnSth); // fetch cat report
router.post("/resolved", fetchResolvedReports); //resolved report

module.exports = router;
