const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendMail = async (req, res) => {
  const { fullName, email, message } = req.body;
  const options = {
    from: "leartmarteti@hotmail.com",
    to: "lm43401@ubt-uni.net",
    subject: "Email response",
    // text: fullName + "\n" + message + "\n" + email\,
    text: fullName + "..." + email + "..." + message,
  };
  await transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
  res.status(200).json({ success: true, message: "email has been send" });
};
module.exports = {
  sendMail,
};
