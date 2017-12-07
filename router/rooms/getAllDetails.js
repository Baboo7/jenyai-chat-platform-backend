'use strict';
const roomsCtrl = require('../../database/controllers/rooms');

/*  Gets a room from the database.

    PARAMS
      req (object): request object
      res (object): response object

    RETURN
      none
*/
const getAllDetails = (req, res) => {
  // Retrieve room information from database
  roomsCtrl.findAll(rooms => {
    return res.status(200).json(rooms);
  });
};

module.exports = getAllDetails;
