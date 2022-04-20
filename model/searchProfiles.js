const mongoose = require("mongoose");

//reverse geocoding api
//https://maps.googleapis.com/maps/api/geocode/json?latlng=16.66667,101.18333&key=YOUR_API_KEY

const searchProfilesSchema = new mongoose.Schema({
  typeOfProfile: {
    type: String,
    enum: ["invesmentProperty", "land", "NewBuildingProjects"],
  },
  propertyType: {
    type: String,
    enum: ["living", "commerce", "residential", "commercial"],
  },

  //geolocations
  adress: {
    type: String,
    required: [true, "Please add an adress"],
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formatedAdress: String,
    country: String,
    state: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("searchProfiles", searchProfilesSchema);
