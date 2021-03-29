const jwt = require('jsonwebtoken');
const config = require("../config");
const authRepo = require("../repositories/authRepo");

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, config.secretToken, (err, user) => {
      console.log(user)
      const isLoginUser = authRepo.checkIfUserExist(user);

      if (err || !isLoginUser) return res.sendStatus(403)

      req.user = user
  
      next()
    })
}

module.exports = authMiddleware;