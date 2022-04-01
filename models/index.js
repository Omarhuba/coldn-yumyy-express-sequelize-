require('dotenv').config()
const {Sequelize} = require('sequelize')
const setupUser = require('./Users')
const setupFlavors = require('./Flavors')

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: './database/dev.sqlite'
})

const Users = setupUser(sequelize)
const Flavors = setupFlavors(sequelize)


    // Flavors.hasMany( Users )
    // Users.belongsTo( Flavors )
    Flavors.hasMany(Users, {foreignKey: 'vote'})
    Users.belongsTo(Flavors, {foreignKey: 'vote', targetKey: 'id'})



// sequelize.sync({force: false}).then( ()=> {
//     console.log("Database Configured");
// });
// module.exports = {User, Client};

module.exports = {Users, Flavors};










// const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize('test-db', 'user', 'password', {
//     dialect: 'sqlite',
//     storage: './database/dev.sqlite'
// })

// module.exports = sequelize;
