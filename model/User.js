const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const { pick } = require("lodash");

const UserSchema = new mongoose.Schema(
  {
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
      default: "investor",
      enum: ["seller", "investor"],
    },
    subRole: {
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
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

UserSchema.methods.generatePasswordReset = async function () {
  this.resetPasswordExpiresIn = Date.now() + 36000000;
  this.resetPasswordToken = randomBytes(20).toString("hex");
};

UserSchema.methods.getUserInfo = function () {
  return pick(this, ["_id", "email", "role", "subrole"]);
};

const User = mongoose.model("users", UserSchema);
module.exports = User;

//web links for mongoose
//https://medium.com/geekculture/role-based-access-control-rbac-for-nosql-db-in-nodejs-e72924074d13,
//https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb/connect-using-mongoose#using-mongoose-discriminators-to-store-data-in-a-single-collection,
//https://koala-moon.com/typescript-and-mongoose-mongodb-discriminators/
