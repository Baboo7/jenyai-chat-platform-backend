'use strict';
const roomsCtrl = require('../../database/controllers/rooms');

/*  Gets a room from the database.

    PARAMS
      req (object): request object
      res (object): response object

    RETURN
      none
*/
const getAllName = (req, res) => {
  // Retrieve room information from database
  roomsCtrl.findAllName(rooms => {

    let msg = {
      success: true,
      rooms: rooms
    };

    return res.status(200).json(msg);
  });
};

module.exports = getAllName;
