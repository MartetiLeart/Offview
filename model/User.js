const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const { pick } = require("lodash");
const jwt = require("jsonwebtoken");
require(`dotenv`).config();

const baseOptions = {
  discriminatorKey: "__type",
  collection: "users",
};

//base model
const baseSchema = mongoose.model(
  "base",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
      },
      password: {
        type: String,
        required: true,
        minlength: [8, "Minimum password length is 8 characters"],
      },
      role: {
        type: String,
        default: "private",
        enum: ["owner", "broker", "private", "company"],
      },
      verified: {
        type: Boolean,
        required: false,
      },
      verificationCode: {
        type: String,
        required: false,
      },
      resetPasswordToken: {
        type: String,
        required: false,
      },
      resetPasswordExpiresIn: {
        type: String,
        required: false,
      },
    },
    baseOptions,
    { timestamps: true }
  )
);

baseSchema.schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method for  comparing password
baseSchema.schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//schema generate you password reset token key method
baseSchema.schema.methods.generatePasswordReset = async function () {
  this.resetPasswordExpiresIn = Date.now() + 36000000;
  this.resetPasswordToken = randomBytes(20).toString("hex");
};

baseSchema.schema.methods.generateJWT = async function () {
  let payload = {
    username: this.username,
    email: this.email,
    id: this._id,
  };
  return await jwt.sign(payload, process.env.APP_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
//get user info from mongo
baseSchema.schema.methods.getUserInfo = function () {
  return pick(this, ["_id", "username", "email", "role", "verified"]);
};

//investor company schema
const icompanySchema = baseSchema.discriminator(
  "icompany",
  new mongoose.Schema({
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
  })
);

//investor private Schema
const iprivateSchema = baseSchema.discriminator(
  "iprivate",
  new mongoose.Schema({
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
  })
);

// owner model schema
const sownerSchema = baseSchema.discriminator(
  "sowner",
  new mongoose.Schema({
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
  })
);

//seller broker schema
const sbrokerSchema = baseSchema.discriminator(
  "sbroker",
  new mongoose.Schema({
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
  })
);

module.exports = {
  icompanySchema,
  iprivateSchema,
  sownerSchema,
  sbrokerSchema,
  baseSchema,
};
