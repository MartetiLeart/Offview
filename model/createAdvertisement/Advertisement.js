const mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: "__type",
  collection: "advertisements",
};

const advertisementBaseSchema = mongoose.model(
  "advertisement",
  new mongoose.Schema(
    {
      advertisementType: {
        type: String,
        enum: ["Invesment properties", "Land", "NewBuildingProject"],
      },
      propertyType: {
        type: String,
        enum: ["Living", "Commercial", "Residential and commercial"],
      },

      //first part
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

      //third part
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
    baseOptions,

    { timestamps: true }
  )
);
//Type:invesment
const invesmentCommercialSchema = advertisementBaseSchema.discriminator(
  "iCommercial",
  new mongoose.Schema({
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
  })
);

const invesmentLivingSchema = advertisementBaseSchema.discriminator(
  "iLiving",
  new mongoose.Schema({
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
  })
);

const invesmentResidencialAndCommercialSchema =
  advertisementBaseSchema.discriminator(
    "iResidencialAndCommercial",
    new mongoose.Schema({
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
    })
  );

//Type:Land
const landCommercialSchema = advertisementBaseSchema.discriminator(
  "landCommercial",
  new mongoose.Schema({})
);
const landLivingSchema = advertisementBaseSchema.discriminator(
  "landLiving",
  new mongoose.Schema({})
);
const landResidencialAndCommercialSchema =
  advertisementBaseSchema.discriminator(
    "landResidencialAndCommercial",
    new mongoose.Schema({})
  );

//Type: New Building Project
const newBPCommercialSchema = advertisementBaseSchema.discriminator(
  "newBPCommercial",
  new mongoose.Schema({})
);
const newBPLivingSchema = advertisementBaseSchema.discriminator(
  "newBPLiving",
  new mongoose.Schema({})
);
const NewBPResidencialAndCommercialSchema =
  advertisementBaseSchema.discriminator(
    "NewBPResidencialAndCommercial",
    new mongoose.Schema({})
  );

module.exports = {
  //base
  advertisementBaseSchema,
  //invesment
  invesmentCommercialSchema,
  invesmentLivingSchema,
  invesmentResidencialAndCommercialSchema,
  //land
  landCommercialSchema,
  landLivingSchema,
  landResidencialAndCommercialSchema,
  //New building projects
  newBPCommercialSchema,
  newBPLivingSchema,
  NewBPResidencialAndCommercialSchema,
};
