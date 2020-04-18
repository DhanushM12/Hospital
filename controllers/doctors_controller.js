const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

//register doctor
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/doctor/profile");
  }
  return res.redirect("back");
};

//login using jwt
module.exports.createSession = async function (req, res) {
  try {
    let user = await Doctor.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username and password",
      });
    }

    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), "codial", { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    console.log("#####", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
