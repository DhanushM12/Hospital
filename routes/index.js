const express = require("express"); //fetch the existing instance
const router = express.Router();

router.use("/doctors", require("./doctor"));

module.exports = router;
