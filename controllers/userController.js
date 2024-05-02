const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { password, email, username, name } = req.body;
  if (!password || !email || !username || !name) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword: ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    name,
  });
  console.log("user created successfully: ", user);

  if (user) {
    res.status(201).json({ status: 200, data: { _id: user.id, email: user.email, username: user.username, name: user.name } });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user", data: user });
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  console.log(email);
  //compare password with hashed pass.
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("user");
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "400m" }
    );
    res.status(200).json({ status: 200, token: accessToken, username: user.username, email: user.email, name: user.name });
  } else {
    res.status(401);
    throw new Error("Please enter a valid credentials ");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information", data: req.user });
});

module.exports = { registerUser, loginUser, currentUser };
