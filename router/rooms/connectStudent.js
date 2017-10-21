const roomsCtrl = require('../../database/controllers/rooms');
const tokenManager = require('../../utils/tokenManager');

/*  Searches for a room in the database by its name.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        roomName (string): name of the room
        userName (string): name of the user
      res (object): response object

    RETURN
      none
*/
const connectStudent = (req, res) => {
  // Check parameters presence
  let roomName = req.body.roomName;
  if (!roomName) {
    return res.status(200).json({ success: false });
  }

  let userName = req.body.userName;
  if (!userName) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof roomName !== 'string') {
    return res.status(200).json({
      success: false,
      message: 'The connection could not be established with the classroom. Is the name of the classroom correct?'
    });
  }

  if (typeof userName !== 'string') {
    return res.status(200).json({
      success: false,
      message: 'The connection could not be established with the classroom. Is your name correct?'
    });
  }

  // Check if room exists in database
  roomsCtrl.find(roomName, room => {
    if (room === null) {
      return res.status(200).json({
        success: false,
        message: 'The connection could not be established with the classroom. Is the name of the classroom correct?'
      });
    }

    let user = {
      unm: userName,
      utp: 'student',
      rnm: room.name
    };

    tokenManager.generateToken(user, token => {
      return res.status(200).json({ success: true, token: token });
    });
  });
};

module.exports = connectStudent;
