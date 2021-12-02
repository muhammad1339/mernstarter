const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

router.post("/login", userController.login);

router.get("/", userController.getUsers);

module.exports = router;
