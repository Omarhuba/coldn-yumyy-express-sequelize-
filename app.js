const express = require("express");
const sequelize = require("sequelize");
require("dotenv").config();
const { Users, Flavors } = require("./models");
const session = require("cookie-session");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ name: "session", keys: [process.env.SESSION_SECRET] }));
app.set("view engine", "ejs");


//original ----- get('/')
app.get("/", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  res.render("index", { flavors, user: req.session.user });

});

app.get("/flavors", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  const counter = await Flavors.findAll({
    attributes: ["name"],
    include: [{ model: Users, required: true }],
    group: "email",
    order: [[sequelize.fn("COUNT", "flavors_id"), "DESC"]],
  })
  .then((counter) =>
  counter.map((count) => ({
    amount: count.Users.length,
    name: count.name,
    flavors_id: count.id,//----??????
  }))
  )
  .then((count)=>{
    return count.sort((a,b) => b.amount - a.amount );
  })
  console.log(counter);
  res.render("flavors", { flavors, user: req.session.user, counter });
});



app.post("/flavors", async (req, res) => {
  const { name, flavorsId, flavors_id } = req.body;
  const flavors = await Flavors.create({ name, flavorsId, flavors_id });
  res.send("Flavors inserted!");
});



/////original post vote
// app.post("/vote", async (req, res) => {
  //   const { email } = req.body;
  //   const { flavors_id } = req.query;
  
  //   const annonymEmail = await Users.create({ email, flavors_id });
  //   // console.log(email, flavors_id);
  //   // console.log(annonymEmail);
  //   res.send('email inserted!')
  //   // res.redirect('/thanks')
  // });
  
  /////original post vote
// app.post("/vote", async (req, res) => {
//   const { email } = req.body;
//   const { flavors_id } = req.query;
//   const votedFlavor = await Flavors.findOne({ where: { id: flavors_id } });
//   votedFlavor.increment("flavors_id", { by: 1 });
//   await Users.create({email, flavors_id});
//   res.redirect('/thanks')
// });  

app.post("/vote", async (req, res) => {
  const { email } = req.body;
  const { flavors_id } = req.query;
  const votedFlavor = await Flavors.findOne({ where: { id: flavors_id } });
  votedFlavor.increment("flavors_id", { by: 1 });
  const duplicateEmail = await Users.findOne({where: {email: email}})
  if(!duplicateEmail){
    const userData = await Users.create({email, flavors_id});
    res.redirect('/thanks')
  }else{
    res.send('eoorrrooorrrooorrr')
  }
});  






app.get("/register", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  res.render("register", { flavors, user: req.session.user });
});
app.get("/login", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  res.render("login", { flavors, user: req.session.user });
});

function generateHash(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let hash = generateHash(password);
  const user = await Users.create({ username, email, password: hash });
  // res.send('User inserted!')
  console.log({ username, email, password: hash });
  // req.session.email = {
  //     // username: user.username,
  //     email: user.email,
  //     id: user.id
  // }

  req.session.user = { username: user.username };
  res.redirect("/welcome");
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const login = await Users.findOne({
    where: { email: email, username: username },
  });
  if (!login) {
    res.send("errroooorrr");
  } else if (bcrypt.compareSync(password, login.password)) {
    req.session.user = { username: login.username, id: login.id };
    res.redirect("/welcomeLogin");
  } else {
    res.send("ierrrroooorrr");
  }
});
// app.post("/login", async (req, res) => {
//     let {username, email, password } = req.body;
//     // console.log(req.body);
//     const login = await Users.findOne({ where: { email: email } });
//     console.log(login);
//     const result = bcrypt.compareSync( password, login.password );
//     console.log(result);
//     if (result) {
//         res.redirect('/');
//     } else {
//         res.send("errrrroooorrrrr");
//     }
// });





app.get("/thanks", (req, res) => {
  res.render("thanks");
});

app.get("/welcome", (req, res) => {
  res.render("welcome", { user: req.session.user });
});
app.get("/welcomeLogin", (req, res) => {
  res.render("welcome", { user: req.session.user });
});

app.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
