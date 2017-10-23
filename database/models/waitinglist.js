'use strict';
module.exports = (sequelize, DataTypes) => {
  var waitinglist = sequelize.define('waitinglist', {
    name: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    phone: DataTypes.STRING(20),
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return waitinglist;
};
