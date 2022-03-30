const express = require('express')
require('dotenv').config()
const {Users, Flavors,Votes} = require('./models')

const bcrypt = require('bcryptjs')


const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('view engine', 'ejs')


app.get("/", async (req, res) => {
    const flavors = await Flavors.findAll()
     res.render('index', { flavors });
     console.log(flavors);
   });


app.get('/register', (req,res)=>{
    res.render('register')
})
app.get('/login', (req,res)=>{
    res.render('login')
})


function generateHash(password){
    const hash = bcrypt.hashSync(password)
    return hash;
}
app.post('/register', async (req,res)=>{
    const {email, password} = req.body
    let hash = generateHash(password)
    const user = await Users.create({email, password: hash})
    res.send('User inserted!')
    console.log({email, password:hash});
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    const login = await Users.findOne({ where: { email: email } });
    console.log(login);
    const result = bcrypt.compareSync(password, login.password);
    console.log(result);
    if (result) {
      res.send("You are loged in!");
    } else {
      res.send("errrrroooorrrrr");
    }
  });





app.post('/flavors', async(req,res)=>{
    const {name, flavorsId, flavors_counter} = req.body
    const flavors = await Flavors.create({name, flavorsId, flavors_counter})
    res.send('Flavors inserted!')
    console.log(flavors);
})


app.get("/flavors", async (req, res) => {
   const flavors = await Flavors.findAll()
    res.render("flavors", { flavors });
    console.log(flavors);
  });





app.post('/vote', async(req,res)=>{
    const {email} = req.body.email 
    const annonymEmail = await Votes.create({email})
    console.log(annonymEmail);
    res.redirect('/thanks')
})

app.get("/thanks", (req, res) => {
    res.render("thanks");
  });
  






const PORT = process.env.PORT||8000;
app.listen(PORT, ()=>{console.log(`SERVER STARTED ON PORT: ${PORT}`);})