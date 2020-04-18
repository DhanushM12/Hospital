const Doctor = require("../models/doctor");
const Patient = require("../models/report");
const Report = require("../models/report");

module.exports.status = async function (req, res) {
  let posts = await Report.findById(req.body.status)
    .populate("status")
    .populate({
      path: "status",
      populate: {
        path: "status",
      },
    });

  return res.json(200, {
    message: "Lists of Status",
    posts: posts,
  });
};
