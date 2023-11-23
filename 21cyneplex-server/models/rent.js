'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rent.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Rent.init({
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Duration cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Duration cannot be null"
        }
      }
    },
    paid: DataTypes.BOOLEAN,
    OrderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "OrderId cannot be empty"
        },
        notNull: {
          args: true,
          msg: "OrderId cannot be null"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId cannot be empty"
        },
        notNull: {
          args: true,
          msg: "UserId cannot be null"
        }
      }
    },
    MovieId: DataTypes.INTEGER,
    movie_poster: DataTypes.STRING,
    movie_name: DataTypes.STRING,
    expired: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Rent',
    hooks: {
      beforeCreate(user) {
        user.paid = false;
      }
    }
  });
  return Rent;
};