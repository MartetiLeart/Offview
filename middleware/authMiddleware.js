const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

//require authentication

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check if jwt token exists and its valid
  if (token) {
    jwt.verify(token, process.env.APP_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check the user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.APP_SECRET, async (err, decodedToken) => {
      if (err) {
        req.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    req.locals.user = null;
    next();
  }
};

//user role premission

// const checkRole = (role, subrole) => {
//   return (req, res, next) => {
//     if (req.user.role !== role || req.user.subrole !== subrole) {
//       res.status(401);
//       return res.send("Not allowed");
//     }
//     next();
//   };
// };

module.exports = {
  requireAuth,
  checkUser,
  // checkRole,
};
