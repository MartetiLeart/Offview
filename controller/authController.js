const User = require("../model/User");
const Owner = require("../model/seller/Owner");
const InvestorPrivate = require("../model/investor/InvestorPrivate");
const InvestorCompany = require("../model/investor/InvestorCompany");
const Sellerbroker = require("../model/seller/SellerBroker");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { randomBytes } = require("crypto");
const { sendVerification } = require("../functions/verificationSender");
const { fail } = require("assert");
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

const signup_get = (req, res) => {
  res.render("signup");
};

const login_get = (req, res) => {
  res.render("login");
};

const signup_post = async (req, res) => {
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
    const user = await User.create({
      email,
      password,
      role,
      subRole,
      verificationCode: randomBytes(20).toString("hex"),
    });

    //Email verification send to email
    const name = email.substring(0, email.lastIndexOf("@"));
    let html = `
    <h1>Hello, ${name}</h1>
    <p>Please click the following link to verify your account</p>
    <a href = "${process.env.APP_DOMAIN}users/verify/${user.verificationCode}">Verify Now</a>
    `;
    sendVerification(
      user.email,
      "Verify your account",
      "Please verify your account",
      html
    );

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
    res.status(201).json({
      success: true,
      message: "Your account is created please verify your email address",
    });
  } catch (error) {
    // const errors = handleErrors(err);
    console.log(error);
    res.status(401).json("error");
  }
};

const login_post = async (req, res) => {
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

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const verify = async (req, res) => {
  try {
    const { verficationCode } = req.params;
    const user = await User.findOne({ verficationCode: verficationCode });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token invalid or has expired",
      });
    }
    user.verified = true;
    user.verificationCode = undefined;
    await user.save();
    return res.status(200).json("successful");
  } catch (err) {
    console.log(err);
    return res.status(400).render("error");
  }
};

//Initiating reset password

const resetPasswordInit = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }
    user.generatePasswordReset();
    await user.save();

    const name = user.email.substring(0, user.email.lastIndexOf("@"));
    //Send password reset link to email
    let html = `
    <h1>Hello, ${name}</h1>
    <p>Please click the following link to reset your password</p>
    <a href = "${process.env.APP_DOMAIN}users/resetpassword/${user.resetPasswordToken}">Reset your password</a>`;
    sendVerification(
      user.email,
      "Reset your password",
      "Please reset your password here",
      html
    );
    return res.status(200).render({
      success: true,
      message: "Password link is sent to your email",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Unauthorized access. Invalid reset code",
    });
  }
};

//to render password method
const resetPassword = async (req, res) => {
  try {
    const { resetPasswordToken } = req.params;

    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpiresIn: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token invalid or has expired",
      });
    }
    return res.render("password-reset");
  } catch (error) {
    console.log(err);
    return res.status(400).render("error");
  }
};

//to reset the password
const resetPasswordPost = async (req, res) => {
  try {
    const { resetPasswordToken, password, confirmPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: resetPasswordToken });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token invalid or has expired",
      });
    }
    console.log(password);
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresIn = undefined;
    await user.save();

    //Send confirmation email to user that the password has been changed
    const name = user.email.substring(0, user.email.lastIndexOf("@"));
    let html = `
    <h1>Hello, ${name}</h1>
    <p>Your password has been changed, if it wasn't done by you please contact our support</p>`;
    sendVerification(
      user.email,
      "Reseting password was done successfully",
      "Your password was changed",
      html
    );
    res.status(200).json({
      success: true,
      message: "Your password has been reseted you can log in now",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed something went wrong with changing your password",
    });
  }
};

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
  verify,
  resetPasswordInit,
  resetPassword,
  resetPasswordPost,
};
