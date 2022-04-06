const { Model, DataTypes } = require('sequelize')
// const bcrypt = require('bcryptjs')
const Flavors = require('./Flavors')

module.exports = database =>{
    class Users extends Model {
        hasVoted (){
         return   this.flavors_id != null
        }
    }

    Users.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            unique: true
            //   allowNull: false,
        },
        email:{
            type: DataTypes.STRING,  
            // allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            //   allowNull: false
        },
        // flavors_id:{
        //     type: DataTypes.INTEGER,
        //       allowNull: true,
        //       references:{model: Flavors, key: 'id'}
        // },
     
    },{
        sequelize: database,
        modelName: 'User',
        timestamps: false,
    })
   
    return Users
}