const roomsCtrl = require('../../database/controllers/rooms');

/*  Creates a room in the database if doesn't exist.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        id (string): name of the room
        password (string): password of the room
        teachers (array of strings): contains the email addresses of teachers in charge of the room
      res (object): response object

    RETURN
      none
*/
const create = (req, res) => {
  // Check parameters presence
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({ success: false });
  }

  let password = req.body.password;
  if (!password) {
    return res.status(200).json({ success: false });
  }

  let teachers = req.body.teachers;
  if (!teachers) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof id !== 'string') {
    return res.status(200).json({ success: false });
  }

  if (typeof password !== 'string') {
    return res.status(200).json({ success: false });
  }

  if (!Array.isArray(teachers)) {
    return res.status(200).json({ success: false });
  }

  // Create room if doesn't exist
  roomsCtrl.find(id, room => {
    if (room !== null) {
      return res.status(200).json({ success: false });
    }

    roomsCtrl.create(id, password, teachers, () => {
      return res.status(200).json({ success: true });
    });
  });
};

module.exports = create;
