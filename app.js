const express = require("express");
const sequelize = require("sequelize");
require("dotenv").config();
const { Users, Flavors } = require("./models");
const session = require("cookie-session");
const bcrypt = require("bcryptjs");


const {register, createRegister} = require('./Controller/register')
const {getLogin, postLogin} = require('./Controller/login')
const {getFlavors, postFlavors} = require('./Controller/flavors')


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
  const session = req.session.user
  // console.log(user);
  // console.log(user);
  res.render("index", { flavors, user: req.session.user });

});



 
  
app.post("/vote", async (req, res) => {
  let email = null;
  if(req.session.user){
    email = req.session.user.email
  }else{
    email = req.body.email
  }
  // const {email} = req.body
  // console.log(email);
  const { flavors_id } = req.query;
  // console.log(email,flavors_id);
  //const votedFlavor = await Flavors.findOne({ where: { id: flavors_id } });
  //votedFlavor.increment("flavors_id", { by: 1 });
  const user = await Users.findOne({where: {email: email}})
  // console.log(duplicateEmail);
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
      



app.get("/flavors", getFlavors());
app.post("/flavors", postFlavors());

app.get("/register", register() );
app.post("/register", createRegister());


app.get("/login", getLogin());
app.post("/login", postLogin());


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
