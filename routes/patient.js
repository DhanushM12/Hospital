const express = require("express"); //fetch the existing instance
const router = express.Router();
const patientApi = require("../controllers/patients_controller");

router.post("/register", patientApi.register);

router.post("/:id/create_report", patientApi.create);

router.post("/:id/all_reports", patientApi.reports);

module.exports = router;
