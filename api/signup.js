const express = require("express");
const Followers = require("../models/followers");
const Profile = require("../models/Profile");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    if (username.length < 1) return res.status(401).send("Invalid");
    if (regexUserName.test(username)) return res.status(401).send("Invalid");
    const user = await User.findOne({ username: username.toLocaleLowerCase() });
    if (user) return res.status(401).send("Username already taken");
    return res.status(200).send("User is created");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    bio,
    facebook,
    youtbue,
    twitter,
    instgram,
    username,
  } = req.body.user;
  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Password msut be at leat 6 characters");

  try {
    let user;
    user = await User.findOne({ email: email.toLocaleLowerCase() });
    if (user) return res.status(401).send("User already taken");
    user = new User({
      name,
      email: email.toLocaleLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileFields = {};
    profileFields.user = user._id;
    profileFields.bio = bio;
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (youtbue) profileFields.social.youtbue = youtbue;
    if (instgram) profileFields.social.instgram = instgram;
    if (twitter) profileFields.social.twitter = twitter;

    await new Profile(profileFields).save();
    await new Followers({
      user: user._id,
      followers: [],
      following: [],

      // create and sent the token
    }).save();
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
