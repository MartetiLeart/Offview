const router = require("express").Router();
const {
  verify_now,
  editUser,
  deleteUser,
  getOne,
  signup_get,
  login_get,
  login_post,
  signup_post,
  getAll,
  resetPassword,
  resetPasswordInit,
  resetPasswordPost,
} = require("../controller/authController");
const authGuard = require("../middleware/auth-guard");

//sign up and login routes
router.get("/signup", signup_get);
router.get("/login", authGuard, login_get);
router.post("/signup", signup_post);
router.post("/login", login_post);

//get all users
router.get("/getAll", getAll);

//Route for email verification
router.get("/users/verify/:verificationCode", verify_now);

//initiating reset password
router.put("/users/resetpassword", resetPasswordInit);

//Route for reseting the password
router.get("/users/resetpassword/:resetPasswordToken", resetPassword);

//post for new password
router.post("/users/resetpassword", resetPasswordPost);

module.exports = router;
