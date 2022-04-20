const router = require("express").Router();
const authController = require("../controller/authController");

//sign up and login routes
router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;
