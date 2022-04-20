const privacyPolicy = require("../model/privacyPolicy");

const privacyPolicyGet = async (req, res) => {
  try {
    const privacy = await privacyPolicy.find({});

    res.status(200).json({ privacy: privacy });
  } catch (error) {
    console.log(error);
  }
};
const privacyPolicyPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const privacy = await privacyPolicy.create({
      title: title,
      content: content,
    });

    return res.status(200).json("It created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const privacyPolicyPatch = async (req, res) => {
  try {
    const privacy = await privacyPolicy.findById(req.params.id);
    Object.assign(privacy, req.body);
    res.json({ privacy: privacy });
    privacy.save();
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
};
const privacyPolicyDelete = async (req, res) => {
  try {
    const updated = await privacyPolicy.deleteOne({ _id: req.params.id });
    res.status(201).json("It deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Not found" });
  }
};

module.exports = {
  privacyPolicyPost,
  privacyPolicyGet,
  privacyPolicyPatch,
  privacyPolicyDelete,
};
