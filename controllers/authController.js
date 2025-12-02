const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation of errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "selasithegoat secret", {
    expiresIn: maxAge,
  });
};

function getSignup(req, res) {
  res.render("signup");
}

function getLogin(req, res) {
  res.render("login");
}

async function postSignup(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

async function postLogin(req, res) {
  const { email, password } = req.body;

  try{
    const user = await User.login(email, password);
    res.status(200).json({user: user._id})
  }catch(err){
    res.status(400).json({})
  }
}

module.exports = {
  getSignup,
  getLogin,
  postSignup,
  postLogin,
};
