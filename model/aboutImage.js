const mongoose = require("mongoose");

const aboutImageSchema = mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("aboutImages", aboutImageSchema);
