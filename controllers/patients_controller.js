const Doctor = require("../models/doctor");
const Patient = require("../models/report");
const Report = require("../models/report");

//register patient
module.exports.register = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/patients/profile");
  }
  return res.redirect("back");
};

//create patient
module.exports.create = async function (req, res) {
  try {
    let post = await Patient.create({
      phone: req.body.phone,
      user: req.user._id,
      name: req.body.name,
      status: req.body.status,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Patient Registered!",
      });
    }
    return res.redirect("back");
  } catch (err) {
    return res.redirect("back");
  }
};

//all reports
module.exports.reports = async function (req, res) {
  let posts = await Patient.findById(req.body.reports)
    .sort("-createdAt")
    .populate("reports")
    .populate({
      path: "reports",
      populate: {
        path: "reports",
      },
    });

  return res.json(200, {
    message: "Lists of Reports",
    posts: posts,
  });
};
