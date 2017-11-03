const roomsCtrl = require('../../database/controllers/rooms');
const tokenManager = require('../../utils/tokenManager');

/*  Searches for a room in the database by its name and password.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        roomName (string): name of the room
        password (string): password of the room
        userName (string): name of the user
      res (object): response object

    RETURN
      none
*/
const connectTeacher = (req, res) => {
  // Check parameters presence
  let roomName = req.body.roomName;
  if (!roomName) {
    return res.status(200).json({ success: false });
  }

  let password = req.body.password;
  if (!password) {
    return res.status(200).json({ success: false });
  }

  let userName = req.body.userName;
  if (!userName) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof roomName !== 'string' || typeof password !== 'string' || typeof userName !== 'string') {
    return res.status(200).json({
       success: false,
       message: 'The connection could not be established with the classroom. Are the credentials valid?'
     });
  }

  // Check if room exists in database
  roomsCtrl.findPassword(roomName, password, room => {
    if (room === null) {
      return res.status(200).json({
        success: false,
        message: 'The connection could not be established with the classroom. Are the credentials valid?'
      });
    }

    let user = {
      userName: userName,
      userType: 'teacher',
      roomName: room.name
    };

    tokenManager.generateToken(user, token => {
      return res.status(200).json({ success: true, token: token });
    });
  });
};

module.exports = connectTeacher;
