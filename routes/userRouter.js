const express = require("express");
const router = express.Router();
const {
  login,
  loginPage,
  logout,
  createAccount,
  signUpPage,
} = require("../controllers/userController");

router.get("/sign-up", signUpPage);

router.post("/register", createAccount);

router.get("/login", loginPage);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;
