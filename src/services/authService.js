const User = require("../models/user");

const checkIfUserExist = async (user) => {
  if (!user && !user.name && !user.password) return false;

  const loginUser = await User.findOne({
    name: user.name,
    password: user.password,
  });

  return loginUser;
};

const authService = {
  checkIfUserExist,
};

module.exports = authService;
