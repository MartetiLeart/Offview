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
  logout,
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
router.delete("/logout", authGuard, logout);

///////Crud for users//////

//get all users
router.get("/dashboard/getAll", getAll);

//get one user
router.get("/dashboard/getOne/:id", getOne);

//delete a user
router.delete("/dashboard/deleteuser/:id", deleteUser);

//edit a user
router.patch("/dashboard/editUser/:id", editUser);

////////reset and verify email///////

//Route for email verification
router.get("/verify/:verificationCode", verify_now);

//initiating reset password
router.put("/resetpassword", resetPasswordInit);

//Route for reseting the password
router.get("/resetpassword/:resetPasswordToken", resetPassword);

//post for new password
router.post("/resetpassword", resetPasswordPost);

//Export

module.exports = router;
