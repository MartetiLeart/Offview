const router = require("express").Router();

const {
  privacyPolicyGet,
  privacyPolicyPost,
  privacyPolicyPatch,
  privacyPolicyDelete,
} = require("../controller/privacyPolicyController");

//routes
router.get("/dashboard/privacypolicy", privacyPolicyGet);
router.post("/dashboard/privacypolicy", privacyPolicyPost);
router.patch("/dashboard/privacypolicy/:id", privacyPolicyPatch);
router.delete("/dashboard/privacypolicy/:id", privacyPolicyDelete);

module.exports = router;
