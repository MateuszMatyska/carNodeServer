const express = require("express");
const router = express.Router();
const config = require("../../../config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const md5 = require("md5");
const userService = require("../../services/authService");

const generateAccessToken = (username) =>
  jwt.sign({ name: username }, config.secretToken, { expiresIn: "1800s" });

router.post("/register", async (req, res) => {
  try {
    const newUser = await userService.addUser(
      req.body.name,
      req.body.password,
      generateAccessToken(req.body.name)
    );

    res.json({ name: newUser.name, token: newUser.token });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const login = {
      name: req.body.name,
      password: md5(req.body.password),
    };

    const user = await userService.loginUser(login.name, login.password);

    if (user !== null) {
      const updatedUser = await userService.updateUserToken(
        user.name,
        generateAccessToken(user.name)
      );

      res.json({ name: updatedUser.name, token: updatedUser.token });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
