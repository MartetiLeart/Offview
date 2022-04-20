const router = require("express").Router();
const {
  faqGet,
  faqPost,
  faqPatch,
  faqDelete,
} = require("../controller/faqController");

//routes
router.get("/faq", (req, res) => {
  res.render("faq");
});

router.get("/dashboard/faq", faqGet);
router.post("/dashboard/faq", faqPost);
router.patch("/dashboard/faq/:id", faqPatch);
router.delete("/dashboard/faq/:id", faqDelete);

module.exports = router;
