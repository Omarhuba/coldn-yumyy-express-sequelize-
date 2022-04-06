const { Model, DataTypes } = require("sequelize");
const Flavors = require("./Flavors");

module.exports = (database) => {
  class Users extends Model {
    hasVoted() {
      return this.flavors_id != null;
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        //   allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        //   allowNull: false
      },
    },
    {
      sequelize: database,
      modelName: "User",
      timestamps: false,
    }
  );

  return Users;
};
