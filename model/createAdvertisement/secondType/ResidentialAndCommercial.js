const mongoose = require("mongoose");

const ResidentialAndCommercialSchema = new mongoose.Schema(
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
      salesPrice: {
        type: Number,
        required: true,
      },
      netRentalIncomePerYear: {
        type: Number,
        required: true,
      },
      proportionCommercial: {
        type: Number,
        required: true,
      },
      proportionResidential: {
        type: Number,
        required: true,
      },
      plotArea: {
        type: Number,
        required: true,
      },
      destinationZoneType: {
        type: Number,
        required: true,
      },
      yearofConstruction: {
        type: Number,
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
      commercialUnits: {
        type: Number,
        required: true,
      },
      commercialSpace: {
        type: Number,
        required: true,
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
      goodsLift: {
        type: Boolean,
      },
      fibreOpticConnection: {
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
    },
  },
  { timestamps: true }
);

const ResidentialAndCommercial = mongoose.model(
  "ResidentialAndCommercial",
  ResidentialAndCommercialSchema
);

module.exports = ResidentialAndCommercial;
