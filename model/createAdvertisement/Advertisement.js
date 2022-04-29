const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema(
  {
    advertisementType: {
      type: String,
      enum: ["Invesment properties", "Land", "New building project"],
    },
    advertisementSecondType: {
      type: String,
      enum: ["Living", "Commercial", "Residential and commercial"],
    },
  },
  { timestamps: true }
);

const Advertisement = mongoose.model("advertisements", AdvertisementSchema);

module.exports = Advertisement;
