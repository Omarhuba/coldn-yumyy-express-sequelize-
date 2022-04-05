const bcrypt = require("bcryptjs");
const {Flavors, Users} = require('../models/index')
const register = ()=> async (req, res) => {
    const flavors = await Flavors.findAll();
    const user = req.body.user;
    res.render("register", { flavors, user: req.session.user });
  }

const  createRegister = () => async (req, res) => {
    const { username, email, password } = req.body;
    const { flavors_id } = req.query;
    let hash = generateHash(password);
    const duplicateEmail = await Users.findOne({where: {email: email}})
    if(!duplicateEmail){
      const user = await Users.create({ username, email, password: hash });
      req.session.user = user;
      res.redirect("/welcome");
    }else{
      res.redirect('errorDuplicate')
    }
    // console.log({ username, email, password: hash });
  }

  function generateHash(password) {
    const hash = bcrypt.hashSync(password);
    return hash;
  }

module.exports = {register, createRegister}


