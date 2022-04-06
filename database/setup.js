const { Users, Flavors } = require("../models");

Users.sync({ force: true });
Flavors.sync({ force: true });
