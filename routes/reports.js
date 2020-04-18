const express = require("express"); //fetch the existing instance
const router = express.Router();
const reportsApi = require("../controllers/reports_controller");

router.post("/status", reportsApi.status);

module.exports = router;
