const express = require("express"); //fetch the existing instance
const router = express.Router();
const doctorApi = require("../controllers/doctors_controller");

router.post("/login", doctorApi.createSession);

router.post("/register", doctorApi.signUp);

module.exports = router;
