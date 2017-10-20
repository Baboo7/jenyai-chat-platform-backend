const roomsCtrl = require('../../database/controllers/rooms');

/*  Searches for a room in the database by its name and password.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        id (string): name of the room
        password (string): password of the room
      res (object): response object

    RETURN
      none
*/
const connectTeacher = (req, res) => {
  // Check parameters presence
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({ success: false });
  }

  let password = req.body.password;
  if (!password) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof id !== 'string' || typeof password !== 'string') {
    return res.status(200).json({
       success: false,
       message: 'The connection could not be established with the classroom. Are the credentials valid?'
     });
  }

  // Check if room exists in database
  roomsCtrl.findPassword(id, password, room => {
    if (room === null) {
      return res.status(200).json({
        success: false,
        message: 'The connection could not be established with the classroom. Are the credentials valid?'
      });
    }

    return res.status(200).json({ success: true });
  });
};

module.exports = connectTeacher;
