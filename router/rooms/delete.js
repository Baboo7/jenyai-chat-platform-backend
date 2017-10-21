const roomsCtrl = require('../../database/controllers/rooms');
const sockets = require('../../websocket/sockets');
const roomManager = require('../../websocket/managers/room');

/*  Deletes a room from the database and the RAM of the server.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        id (string): name of the room
      res (object): response object

    RETURN
      none
*/
const deleteRoom = (req, res) => {
  // Check parameters presence
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof id !== 'string') {
    return res.status(200).json({ success: false });
  }

  // Delete room from database and RAM of the server
  roomsCtrl.delete(id, () => {
    return res.status(200).json({ success: true });
  });
};

module.exports = deleteRoom;
