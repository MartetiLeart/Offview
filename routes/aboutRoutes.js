const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const upload = multer({ dest: "uploads/" });
const {
  editFile,
  uploadFile,
  getFileStream,
  deleteFileStream,
  createDBfile,
} = require("../controller/aboutController");

router.get("/about", (req, res) => {
  res.render("about");
});

router.delete("/dashboard/about/images/delete/:key", async (req, res) => {
  const key = req.params.key;
  try {
    await deleteFileStream(key);
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("ERROR ON DELETE");
  }
});

router.get("/dashboard/about/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});
router.post("/dashboard/about", upload.single("image"), async (req, res) => {
  const file = req.file;
  const { fullName, jobTitle } = req.body;
  console.log(file);
  try {
    const result = await uploadFile(file, fullName, jobTitle);
    const resultdb = await createDBfile(file, fullName, jobTitle);
    await unlinkFile(file.path);
    console.log(result);
    console.log("image has been uploaded");
    res.status(200).send({});
  } catch (err) {
    console.log(err);
    res.status(500).json("About page uploading file ERROR");
  }
  const description = req.body.description;
});

router.patch(
  "/dashboard/about/edit/:key",
  upload.single("image"),
  async (req, res) => {
    const fileKey = req.params.key;
    const file = req.file;
    const { fullName, jobTitle } = req.body;
    try {
      await editFile(file, fileKey);
      await createDBfile(file, fullName, jobTitle);
      await unlinkFile(file.path);
    } catch (err) {
      console.log(err);
      res.status(404).json("error in patch");
    }
  }
);

module.exports = router;
