const router = require("express").Router();
const {
  advertisement_Get,
  advertisement_GetAll,
  advertisement_Post,
  advertisement_Put,
  advertisement_Delete,
  advertisement_Search,
} = require("../controller/advertisementController");

// route to get one advertisement
router.get("/advertisement/:id", advertisement_Get);
// route to get all advertisements
router.get("/advertisement", advertisement_GetAll);
// route to post an advertisement
router.post("/advertisement", advertisement_Post);
// route to edit an advertisement
router.put("/advertisement", advertisement_Put);
// route to delete an advertisement
router.delete("/advertisement:id", advertisement_Delete);
// route to search an advertisement
router.get("/advertisement/search", advertisement_Search);

module.exports = router;
