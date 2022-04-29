const mongoose = require("mongoose");

const LivingSchema = new mongoose.Schema(
  {
    advertisementType: {
      type: String,
      default: "Invesment properties",
      enum: ["Invesment properties", "Land", "New building project"],
    },
    firstArea: {
      title: {
        type: String,
        required: true,
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
      SalesPrice: {
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
      residentialUnits: {
        type: Number,
        required: true,
      },
      livingSpace: {
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
      minergieStandard: {
        type: Boolean,
      },
      passengerLift: {
        type: Boolean,
      },
      glassFibreConnection: {
        type: Boolean,
      },
      electricCarChargingStation: {
        type: Boolean,
      },
      buildingLease: {
        type: Boolean,
      },
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

      typeOfFile: {
        type: String,
        enum: [
          "Brokerage contract",
          "Land register excerpt",
          "Tenant schedule",
          "Building insurance policy",
          "Floor plans",
        ],
      },
    },
  },
  { timestamps: true }
);

const Living = mongoose.model("living", LivingSchema);

module.exports = Living;
