const { Model, DataTypes } = require("sequelize");

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
