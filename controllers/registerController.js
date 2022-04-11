const { Flavors, Users} = require('../models')
const bcrypt = require("bcryptjs");
const session = require("cookie-session");



const getRegister = async (req, res) => {
    const flavors = await Flavors.findAll();
    const user = req.body.user;
    res.render("register", { flavors, user: req.session.user });
}


function generateHash(password) {
    const hash = bcrypt.hashSync(password);
    return hash;
}

const postRegister = async (req, res) => {
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
}

module.exports = {getRegister, postRegister}