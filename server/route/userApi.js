const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
// there are 4 types of http methods in express 1. get 2.post 3.put 4.delete
// here we are supposed to create a user so we are using post method:
// signup API
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingemail = await User.findOne({ email });
    if (existingUser || existingemail) {
      res.status(400).json({ message: "User already existing" });
    } else if (username.length <= 3) {
      res.status(400).json({ message: "Username is too small" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hashPassword,
      email: email,
    });
    await newUser.save();
    const userId = await User.findOne({ username });
    res
      .status(200)
      .json({ message: "user created succesfully", _id: userId._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// login api:-
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
      res.status(400).json({ message: "The user does not exist" });
    }
    bcrypt.compare(password, checkUser.password, (err, data) => {
      if (data) {
        res
          .status(200)
          .json({ username: checkUser.username, _id: checkUser._id });
      } else {
        res.status(400).json({ message: "Password is incorrect" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
