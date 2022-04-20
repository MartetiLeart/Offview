const imprint = require("../model/imprint");

const imprintGet = async (req, res) => {
  try {
    const imprinti = await imprint.find();
    res.status(200).json({ imprinti: imprinti });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const imprintPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const imprinti = await imprint.create({ title: title, content: content });
    res.status(200).json({ imprinti: imprinti });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const imprintPut = async (req, res) => {
  const body = req.body;
  try {
    await imprint.updateOne({ _id: req.params.id }, body);
    const imprinti = await imprint.findOne({ _id: req.params.id });
    res.status(200).json({ imprinti: imprinti });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const imprintDelete = async (req, res) => {
  try {
    await imprint.deleteOne({ _id: req.params.id });
    res.status(200).json("Succesfully deleted imprint");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Delete error" });
  }
};

module.exports = {
  imprintGet,
  imprintPost,
  imprintPut,
  imprintDelete,
};
