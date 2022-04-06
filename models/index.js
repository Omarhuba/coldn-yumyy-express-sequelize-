require("dotenv").config();
const { Sequelize } = require("sequelize");
const setupUser = require("./Users");
const setupFlavors = require("./Flavors");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/dev.sqlite",
});

const Users = setupUser(sequelize);
const Flavors = setupFlavors(sequelize);

Flavors.hasMany(Users, { foreignKey: "flavors_id" });
Users.belongsTo(Flavors, { foreignKey: "flavors_id", targetKey: "id" });

module.exports = { Users, Flavors };
