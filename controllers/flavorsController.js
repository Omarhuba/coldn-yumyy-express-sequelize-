const { Flavors, Users} = require('../models')
const sequelize = require("sequelize");


const getFlavors = async (req, res) => {
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
}

const postFlavors = async (req, res) => {
    const { name, images, flavorsId, flavors_id } = req.body;
    const flavors = await Flavors.create({ name, images, flavorsId, flavors_id });
    res.redirect("/");
}

module.exports = {getFlavors, postFlavors}