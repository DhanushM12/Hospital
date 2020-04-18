const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Doctor = require("../models/doctor");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a doctor and establish identity
      Doctor.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }

        if (!user || user.password != password) {
          req.flash("error", "Invalid username/password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  Doctor.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding Doctor --> Passport");
      return done(err);
    }
    return done(null, user);
  });
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if user is signed in then pass on the req to next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not sign -in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
