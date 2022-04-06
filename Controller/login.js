const {Flavors, Users} = require('../models/index')
const bcrypt = require("bcryptjs");



const getLogin = () => async (req, res) => {
    const flavors = await Flavors.findAll();
    const user = req.session.user;
    console.log(user);
    res.render("login", { flavors, user: req.session.user });
  }


  const postLogin = ()=> async (req, res) => {
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
  }

  module.exports = {getLogin, postLogin}