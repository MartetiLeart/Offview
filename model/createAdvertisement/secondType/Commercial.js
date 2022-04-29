const mongoose = require("mongoose");

const CommercialSchema = new mongoose.Schema(
  {
    advertisementType: {
      type: String,
      default: "Invesment properties",
      enum: ["Invesment properties", "Land", "New building project"],
      index: true,
    },
    firstArea: {
      title: {
        type: String,
        required: true,
        index: true,
      },
      street: {
        type: String,
        required: true,
      },

      No: {
        type: Number,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
      town: {
        type: String,
        required: true,
      },
    },
    secondArea: {
      salesPrice: {
        type: Number,
        required: true,
      },
      netRentalIncomePerYear: {
        type: Number,
        required: true,
      },
      plotArea: {
        type: Number,
        required: true,
      },
      destinationZoneType: {
        type: String,
      },
      yearOfConstruction: {
        type: Date,
        required: true,
      },
      floors: {
        type: Number,
        required: true,
      },
      cubature: {
        type: Number,
        required: true,
      },
      commercialUnits: {
        type: Number,
        required: true,
      },
      commercialSpace: {
        type: Number,
      },
      numberOfGarage: {
        type: Number,
        required: true,
      },
      numberOfUndergroundParkingSpace: {
        type: Number,
        required: true,
      },
      numberOfOutdoorParkingSpace: {
        type: Number,
        required: true,
      },
      passengerLift: { type: Boolean },
      goodsLift: { type: Boolean },
      fibreOpticConnection: { type: Boolean },
      electricCarChargingStation: { type: Boolean },
      buildingLease: { type: Boolean },
    },
    thirdArea: {
      totalActualRentalIncome: {
        type: Number,
        required: true,
      },
      returnOnInvestment: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      file: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

CommercialSchema.index({ advertisementType: "text", title: "text" });

const Commercial = mongoose.model("commercial", CommercialSchema);

module.exports = Commercial;
