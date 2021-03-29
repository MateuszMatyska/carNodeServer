const express = require('express');
const router = express.Router();
const config = require("../../config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const md5 = require("md5");

const generateAccessToken = (username, password) => (
    jwt.sign({name: username, password: password}, config.secretToken, { expiresIn: '1800s' })
)

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      password: md5(req.body.password),
      token: generateAccessToken(req.body.name, md5(req.body.password))
    });

    const newUser = await user.save();
    
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

    const user = await User.findOne({
      name: login.name,
      password: login.password,
    });

    if (user) {  
      const updatedUser = await User.findOneAndUpdate(
        { name: user.name, password: user.password },
        {
          $set: {
            token: generateAccessToken(user.name, user.password),
          },
        }
      );

      res.json({name: updatedUser.name, token: updatedUser.token});
    }
    else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;