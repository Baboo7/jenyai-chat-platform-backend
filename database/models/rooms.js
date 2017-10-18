'use strict';
module.exports = (sequelize, DataTypes) => {
  var rooms = sequelize.define('rooms', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    teachers: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return rooms;
};