const router = require("express").Router();
const authController = require("../controller/authController");

//sign up and login routes
router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

//Route for email verification
router.get("/users/verify/:verificationCode", authController.verify);

//Route for reseting the password

router.get(
  "/users/resetpassword/:resetPasswordToken",
  authController.resetPassword
);
//initiating reset password
router.put("/users/resetpassword", authController.resetPasswordInit);

//post for new password
router.post("/users/resetpassword", authController.resetPasswordPost);

module.exports = router;
