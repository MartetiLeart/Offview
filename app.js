const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const privacyPolicy = require("./routes/privacyPolicy");
const imprint = require("./routes/imprintRoutes");
const contact = require("./routes/contactRoutes");
const faq = require("./routes/faqRoutes");
const about = require("./routes/aboutRoutes");
// const passport = require("passport");
const {
  requireAuth,
  // checkRole,
  checkUser,
} = require("./middleware/authMiddleware");
require(`dotenv`).config();

//import passport middleware
// require("./middleware/passport");

//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.user(passport.initialize());

//view-engine
app.set("view engine", "ejs");

//database connect
mongoose
  .connect(process.env.APP_DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((result) => {
    app.listen(process.env.APP_PORT);
    console.log(`You are connected to mongoDB!`);
    console.log(`You are listening in port ${process.env.APP_PORT}.`);
  })
  .catch((err) => console.log(err));

//routes
// app.use("*", checkUser);
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/main");
app.use("/", authRoutes);
app.use("/", privacyPolicy);
app.use("/", imprint);
app.use("/", contact);
app.use("/", faq);
app.use("/", about);
app.use("/", advertisementRoutes);
