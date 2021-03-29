const User = require("../models/user");

const checkIfUserExist = async (user) => {
  if (!user?.name && !user?.password) return false;

  const loginUser = await User.findOne({
    name: user.name,
    password: user.password,
  });

  return loginUser;
};

const authRepo = {
  checkIfUserExist,
};

module.exports = authRepo;
