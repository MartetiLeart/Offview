const nodemailer = require("nodemailer");
require("dotenv").config();

//Email sender function
let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendVerification = async (email, subject, text, html) => {
  const options = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
    html,
  };
  await transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
};

module.exports = {
  sendVerification,
};
