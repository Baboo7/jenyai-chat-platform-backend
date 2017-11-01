'use strict';
const roomsCtrl = require('../../database/controllers/rooms');

/*  Get a room from the database.

    PARAMS
      req (object): request object. Must contains the following properties in its params property
        name (string): name of the room
      res (object): response object

    RETURN
      none
*/
const getOne = (req, res) => {
  // Check parameters presence
  let name = req.params.name;
  if (!name) { return res.status(200).json({ success: false }); }

  // Check parameters properties
  if (typeof name !== 'string') { return res.status(200).json({ success: false }); }

  // Retrieve room information from database
  roomsCtrl.find(name, room => {
    return res.status(200).json(room);
  });
};

module.exports = getOne;
