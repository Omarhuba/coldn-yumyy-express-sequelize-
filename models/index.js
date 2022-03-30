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


module.exports = {Users, Flavors, Votes};










// const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize('test-db', 'user', 'password', {
//     dialect: 'sqlite',
//     storage: './database/dev.sqlite'
// })

// module.exports = sequelize;
