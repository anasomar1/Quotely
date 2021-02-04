const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
  console.log("How it do");
};

exports.signUpPage = (req, res) =>
  res.render("register", {
    errors: req.session.validationErrors,
  });

exports.createAccount = (req, res) => {
  User.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.session.validationErrors = validationErrors;
      res.redirect("/users/sign-up");
    });
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((same) => {
            if (same) {
              req.session.userId = user._id;
              res.redirect("/");
            } else {
              res.redirect("/users/login");
            }
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect("/users/login");
      }
    })
    .catch((err) => console.log(err));
};
