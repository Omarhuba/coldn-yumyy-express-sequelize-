const {Sequelize} = require('sequelize')
const setupUser = require('./Users')
const setupFlavors = require('./Flavors')
const setupVotes = require('./Votes')

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: './database/dev.sqlite'
})

const Users = setupUser(sequelize)
const Flavors = setupFlavors(sequelize)
const Votes = setupVotes(sequelize)


// Users.belongsTo(Flavors, {through: Votes, foreignKey: 'user_id'})
// Flavors.belongsTo(Users, {through: Votes, foreignKey: 'flavors_id'})

module.exports = {Users, Flavors, Votes};










// const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize('test-db', 'user', 'password', {
//     dialect: 'sqlite',
//     storage: './database/dev.sqlite'
// })

// module.exports = sequelize;
