const express = require('express')
require('dotenv').config()
const {Users, Flavors,Votes} = require('./models')
const session = require('cookie-session')
const bcrypt = require('bcryptjs')


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use( session({name: 'session',keys: [process.env.SESSION_SECRET]}))
app.set('view engine', 'ejs')




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
    const {username, email, password} = req.body
    let hash = generateHash(password)
    const user = await Users.create({username, email, password: hash})
    // res.send('User inserted!')
    console.log({username, email, password:hash});
    // req.session.email = {
    //     // username: user.username,
    //     email: user.email,
    //     id: user.id
    // }
    
    req.session.user = {username: user.username}
    res.redirect('/welcome')
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    const login = await Users.findOne({ where: { email: email } });
    console.log(login);
    const result = bcrypt.compareSync(password, login.password);
    console.log(result);
    if (result) {
        res.redirect('/');
    } else {
        res.send("errrrroooorrrrr");
    }
});


app.get("/", async (req, res) => {
    const flavors = await Flavors.findAll()
    const user = req.body
     res.render('index', { flavors, user: req.session.user });
     console.log(flavors);
    //  req.session.email = {
    //     email: user.email,
    //     id: user.id
    // }
   });



app.post('/flavors', async(req,res)=>{
    const {name, flavorsId, flavors_id} = req.body
    const flavors = await Flavors.create({name, flavorsId, flavors_id})
    res.send('Flavors inserted!')
    console.log(flavors);
})


app.get("/flavors", async (req, res) => {
   const flavors = await Flavors.findAll()
    res.render("flavors", { flavors });
    console.log(flavors);
  });





app.post('/vote', async(req,res)=>{
    const {email} = req.body
    const annonymEmail = await Votes.create({email})
    console.log(annonymEmail);
    // res.send('email inserted!')
    res.redirect('/thanks')
})

app.get("/thanks", (req, res) => {
    res.render("thanks");
});
  

app.get('/welcome', (req,res) => {
    res.render('welcome', {user: req.session.user})
    // res.render('welcome', {username: req.session.user})
})



app.post('/logout', (req,res) => {
req.session = null
res.redirect('/')
})





const PORT = process.env.PORT||8000;
app.listen(PORT, ()=>{console.log(`SERVER STARTED ON PORT: ${PORT}`);})