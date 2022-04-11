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


app.get("/", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  const session = req.session.user
  res.render("index", { flavors, user: req.session.user });

});



 
  
app.post("/vote", async (req, res) => {
  let email = null;
  if(req.session.user){
    email = req.session.user.email
  }else{
    email = req.body.email
  }
  const { flavors_id } = req.query;
  const user = await Users.findOne({where: {email: email}})
  if(!user){
    const userData = await Users.create({email, flavors_id});
    res.redirect('/thanks')
  }else if(user.hasVoted()){
    res.redirect('errorDuplicate')
  }else{
    user.update({flavors_id})
    res.redirect('/thanks')
  }
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
        flavors_id: count.id, //----??????
      }))
    )
    .then((count) => {
      return count.sort((a, b) => b.amount - a.amount);
    });
  res.render("flavors", { flavors, user: req.session.user, counter });
});
app.post("/flavors", async (req, res) => {
  const { name, images, flavorsId, flavors_id } = req.body;
  const flavors = await Flavors.create({ name, images, flavorsId, flavors_id });
  res.redirect("/");
});




app.get("/register", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.body.user;
  res.render("register", { flavors, user: req.session.user });
});

function generateHash(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const { flavors_id } = req.query;
  const user = req.session.user;
  let hash = generateHash(password);
  const duplicateEmail = await Users.findOne({ where: { email: email } });
  if (!duplicateEmail) {
    const user = await Users.create({ username, email, password: hash });
    req.session.user = user;
    console.log(user);
    res.redirect("/welcome");
  } else {
    res.redirect("errorDuplicate");
  }
});


app.get("/login", async (req, res) => {
  const flavors = await Flavors.findAll();
  const user = req.session.user;
  console.log(user);
  res.render("login", { flavors, user: req.session.user });
});
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const login = await Users.findOne({
    where: { email: email, username: username },
  });
  if (!login) {
    res.redirect("errorLogin");
  } else if (bcrypt.compareSync(password, login.password)) {
    req.session.user = { username: login.username, id: login.id, email: email};
    res.redirect("/welcomeLogin");
  } else {
    res.redirect("ierrrroooorrr");
  }
});


app.get('/admin', async(req,res)=>{
  const flavors = await Flavors.findAll();
    const user = req.session.user;
    console.log(user);
  res.render('admin', { flavors, user: req.session.user })
})






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
