const mongoose = require("mongoose");

const SellerBrokerSchema = new mongoose.Schema({
  //Company info
  companyName: {
    type: String,
    required: true,
  },

  legalForm: {
    type: String,
    required: true,
  },
  UID: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SellersBroker", SellerBrokerSchema);
