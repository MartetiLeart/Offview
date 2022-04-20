const Faq = require("../model/faq");

const faqGet = async (req, res) => {
  try {
    const faq = await Faq.find();
    res.status(200).json({ success: true, data: faq });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Faq server Error" });
  }
};

const faqPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const faq = await Faq.create({ title: title, content: content });
    res.status(200).json({ success: true, data: faq });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Faq server Error" });
  }
};
const faqPatch = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    Object.assign(faq, req.body);
    res.status(200).json({ success: true, data: faq });
    faq.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Faq server Error" });
  }
};
const faqDelete = async (req, res) => {
  try {
    const faq = await Faq.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: faq });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Faq server Error" });
  }
};

module.exports = {
  faqGet,
  faqPost,
  faqPatch,
  faqDelete,
};
