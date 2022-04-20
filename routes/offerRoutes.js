import { Router } from "express";
import uploader from "../middleware/uploaderMiddleware";
import { requireAuth, checkUser } from "../middleware/authMiddleware";
const router = Router;

router.post(
  "/offers",
  requireAuth,
  checkUser,
  uploader.single("offers-image"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.status(201).json({
      message:"testing";
    });
  }
);

export default router;
