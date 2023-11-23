'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : 'Username cannot be null'},
        notEmpty: {msg : 'Username is required'},
      },
      unique: {
        msg: 'Username already exists'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : 'Email cannot be null'},
        notEmpty: {msg : 'Email is required'},
        isEmail: {msg : 'Invalid email format'}
      },
      unique: {
        msg: 'Email already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg : 'Password cannot be null'},
        notEmpty: {msg : 'Password is required'},
        len: {
          args: [8, 32],
          msg: 'Password must be between 8 and 32 characters'
        }
      }
    },
    JWTkey: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: { 
      beforeCreate: (user, options) => {
        user.password = Helper.hashPassword(user.password)
      }
    }
  });
  return User;
};