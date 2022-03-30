const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = database =>{
    class Users extends Model {}

    Users.init({
        // name:{
        //     type: DataTypes.STRING,  allowNull: false
        // },
        userId: {
            type: DataTypes.INTEGER,
            //  allowNull: false,
            autoIncrement: true,
            primaryKey: true 
        },
        email:{
            type: DataTypes.STRING,  
            // allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            //   allowNull: false
        },
    },{
        sequelize: database,
        modelName: 'User',
        timestamps: false
    })
    Users.sync({force: true})
    return Users
}