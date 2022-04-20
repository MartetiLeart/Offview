const mongoose = require("mongoose");

const privacyPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
});

module.exports = mongoose.model("privacyPolicy", privacyPolicySchema);
