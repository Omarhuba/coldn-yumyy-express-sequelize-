const {Sequelize} = require('sequelize')
const setupUser = require('./Users')
const setupFlavors = require('./Flavors')
// const setupVotes = require('./Votes')

const sequelize = new Sequelize( {
    dialect: 'sqlite',
    storage: './database/dev.sqlite'
})

const Users = setupUser(sequelize)
const Flavors = setupFlavors(sequelize)
// const Votes = setupVotes(sequelize)


    Flavors.hasMany( Users )
    Users.belongsTo( Flavors )


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
