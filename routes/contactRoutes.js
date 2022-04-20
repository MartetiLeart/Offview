const router = require("express").Router();

const { sendMail } = require("../controller/contactController");

router.get("/contact", (req, res) => {
  res.render("contact");
});
router.post("/contact", sendMail);

module.exports = router;
