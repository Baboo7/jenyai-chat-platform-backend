'use strict';
module.exports = (sequelize, DataTypes) => {
  var conversations = sequelize.define('conversations', {
    uuid: DataTypes.UUID,
    timestamp: DataTypes.DATE,
    message: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return conversations;
};
