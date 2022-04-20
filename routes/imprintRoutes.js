const router = require("express").Router();
const {
  imprintGet,
  imprintPost,
  imprintPut,
  imprintDelete,
} = require("../controller/imprintController");

//routes

router.get("/dashboard/imprint", imprintGet);
router.post("/dashboard/imprint", imprintPost);
router.put("/dashboard/imprint/:id", imprintPut);
router.delete("/dashboard/imprint/:id", imprintDelete);

module.exports = router;
