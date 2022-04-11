const express = require("express");
// const sequelize = require("sequelize");
require("dotenv").config();
const { Users, Flavors } = require("./models");
const session = require("cookie-session");
// const bcrypt = require("bcryptjs");

const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const flavorsRouter = require("./routes/flavorsRouter");
const voteRouter = require("./routes/voteRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ name: "session", keys: [process.env.SESSION_SECRET] }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  const session = req.session.user;
  res.render("index", { flavors, user: req.session.user });
});


//Routes
app.use(voteRouter);
app.use(flavorsRouter);
app.use(loginRouter);
app.use(registerRouter);





app.get("/admin", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.session.user;
  console.log(user);
  res.render("admin", { flavors, user: req.session.user });
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});
app.get("/errorDuplicate", (req, res) => {
  res.render("errorDuplicate");
});
app.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

app.get("/welcome", (req, res) => {
  res.render("welcome", { user: req.session.user });
});
app.get("/welcomeLogin", (req, res) => {
  res.render("welcome", { user: req.session.user });
});

app.get("/logout", (req, res) => {
  req.session.user = null; /////???????????
  res.redirect("/");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
