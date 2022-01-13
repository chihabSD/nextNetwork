const express = require("express");
const Profile = require("../models/Profile");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

router.post("/", async (req, res) => {
  const { email, password } = req.body.user;
  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Password msut be at leat 6 characters");

  try {
    // check if user exist
    const user = await User.findOne({
      email: email.toLocaleLowerCase(),
    }).select("+password");
    if (!user) return res.status(401).send("Email or Password  is incorrect");

    // check if password matches
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.status(401).send("Email or Password  is incorrect");

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});
module.exports = router;
