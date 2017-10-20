const roomsCtrl = require('../../database/controllers/rooms');

/*  Searches for a room in the database by its name.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        id (string): name of the room
      res (object): response object

    RETURN
      none
*/
const connectStudent = (req, res) => {
  // Check parameters presence
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof id !== 'string') {
    return res.status(200).json({
      success: false,
      message: 'The connection could not be established with the classroom. Is the classroom id correct?'
    });
  }

  // Check if room exists in database
  roomsCtrl.find(id, room => {
    if (room === null) {
      return res.status(200).json({
        success: false,
        message: 'The connection could not be established with the classroom. Is the classroom id correct?'
      });
    }

    return res.status(200).json({ success: true });
  });
};

module.exports = connectStudent;
