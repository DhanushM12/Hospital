const express = require("express"); //fetch the existing instance
const router = express.Router();

router.use("/doctors", require("./doctor"));

router.use("/patients", require("./patient"));

module.exports = router;
