const { Model, DataTypes } = require('sequelize')
// const sequelize = require('../database/dev.sqlite')

module.exports = database =>{
    class Flavors extends Model {}

    Flavors.init({
        flavorsId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flavors_counter: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
    },{
        sequelize: database,
        modelName: 'Flavors',
        timestamps: false
    })
   
        Flavors.sync({ force : true }).then(async () => {
            Flavors.bulkCreate([
                {name: 'Bug'},
                {name: 'Pickiling'},
                {name: 'Red Velvet Ice Cream'},
                {name: 'Bubble Gum Ice Cream'},
                {name: 'French Vanilla Ice Cream'},
                {name: 'Building'},
                {name: 'Strawberry'},
                {name: 'Neopolitan'},
                {name: 'Chocolate Chip Ice Cream'},
                {name: 'Strawberry Cheescake'},
              ],{
                ignoreDuplicates: true,
              }).then(() => console.log("Flavors data have been saved"));
           }); 
    return Flavors
}




