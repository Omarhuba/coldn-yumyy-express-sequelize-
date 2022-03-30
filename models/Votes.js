const { Model, DataTypes } = require('sequelize')

module.exports = database =>{
    class Votes extends Model {}

    Votes.init({
        // name:{
        //     type: DataTypes.STRING,  allowNull: false
        // },
        votesId: {
            type: DataTypes.INTEGER,
            //  allowNull: false,
            // autoIncrement: true,
            // foreignKey: true 
        },
        email:{
            type: DataTypes.STRING,  
            // allowNull: false
        },
      
    },{
        sequelize: database,
        modelName: 'Votes',
        timestamps: false
    })
    Votes.sync({force: true})
    return Votes
}