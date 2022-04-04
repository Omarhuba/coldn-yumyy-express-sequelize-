const { Model, DataTypes } = require("sequelize");
// const sequelize = require('../database/dev.sqlite')

module.exports = (database) => {
  class Flavors extends Model {}

  Flavors.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      //  flavors_id:{
      //       type: DataTypes.INTEGER,
      //         allowNull: true,
      //   },
    },
    {
      sequelize: database,
      modelName: "Flavors",
      timestamps: false,
      underscored: true,
    }
  );

  return Flavors;
};
