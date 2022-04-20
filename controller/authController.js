const User = require("../model/User");
const Owner = require("../model/seller/Owner");
const InvestorPrivate = require("../model/investor/InvestorPrivate");
const InvestorCompany = require("../model/investor/InvestorCompany");
const Sellerbroker = require("../model/seller/SellerBroker");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require(`dotenv`).config();

// // handle errors
// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let errors = { email: "", password: "" };
//   //incorrect email
//   if (err.message === "incorrect email") {
//     errors.email = "That email is not registered";
//   }

//   //incorrect password
//   if (err.message === "incorrect password") {
//     errors.password = "That password is not correct";
//   }
//   if (err.code === 11000) {
//     // duplicate email error
//     errors.email = "that email is already registered";
//     return errors;
//   }

//   // validation errors
//   if (err.message.includes("user validation failed")) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// };

//create token

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.APP_SECRET, { expiresIn: maxAge });
};

//CONTROLLER ACTIONS

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const {
    email,
    password,
    role,
    subRole,
    title,
    firstName,
    lastName,
    phoneNumber,
    street,
    postalCode,
    country,
    companyName,
    legalForm,
    UID,
    website,
  } = req.body;

  try {
    await User.create({
      email,
      password,
      role,
      subRole,
    });
    //Determining what role the user is for singup
    if (role === "seller" && subRole === "owner") {
      await Owner.create({
        title,
        firstName,
        lastName,
        phoneNumber,
        street,
        postalCode,
        country,
      });
    } else if (role === "seller" && subRole === "broker") {
      await SellerCompany.create({
        companyName,
        legalForm,
        UID,
        website,
        title,
        firstName,
        lastName,
        phoneNumber,
        street,
        postalCode,
        country,
      });
    } else if (role === "investor" && subRole === "private") {
      await InvestorPrivate.create({
        title,
        firstName,
        lastName,
        phoneNumber,
        street,
        postalCode,
        country,
      });
    } else if (role === "investor" && subRole === "company") {
      await InvestorCompany.create({
        companyName,
        legalForm,
        UID,
        website,
        title,
        firstName,
        lastName,
        phoneNumber,
        street,
        postalCode,
        country,
      });
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    // const errors = handleErrors(err);
    console.log(error);
    res.status(401).json("error");
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    // const errors = handleErrors(err);
    console.log(error);
    res.status(400).json("error in login");
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
