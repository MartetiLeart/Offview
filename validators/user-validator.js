import { check } from "express-validator";

const email = check("email", "Email is required").isEmail();
const password = check(
  "password",
  "Password is required of minimum length of 8"
).isLength({
  min: 8,
});

module.exports = [email, password];
