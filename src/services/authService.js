const User = require("../models/user");
const md5 = require("md5");

const checkIfUserExist = async (user) => {
  if (!user && !user.name && !user.password) return false;

  const loginUser = await User.findOne({
    name: user.name,
  });

  return loginUser;
};

const addUser = async (name, password, token) => {
  const user = new User({
    name,
    password: md5(password),
    token,
  });

  return await user.save();
};

const updateUserToken = async (name, token) => {
  const user = await User.findOneAndUpdate(
    { name },
    {
      $set: {
        token,
      },
    },
    {
      new: true
    }
  );

  return user 
};

const loginUser = async (login, password) => {
  const user = {name: login, password}
  const result = await checkIfUserExist(user);

  if(result.password === md5(password)) {
    return result;
  }

  return null;
}

const authService = {
  checkIfUserExist,
  addUser,
  updateUserToken,
  loginUser
};

module.exports = authService;
