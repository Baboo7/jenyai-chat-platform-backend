const config = require('../config');
const roomsCtrl = require('../database/controllers/rooms');

const getRoomWithPassword = (req, res) => {
  console.info('route > get classroom with password');
  // Check parameters presence
  let id = req.params.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  let password = req.body.password;
  if (password === undefined) {
    console.error('missing password parameter');
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (id.length !== config.roomIdLength) {
    console.error(`classroom id ${id} has not the right size`);
    return res.status(200).json({
       success: false,
       message: 'The connection could not be established with the classroom. Are the credentials valid?'
     });
  }

  // Check if room exist in database
  roomsCtrl.findPassword(id, password, room => {
    if (room === null) {
      console.info(`classroom ${id} not found`);
      return res.status(200).json({
        success: false,
        message: 'The connection could not be established with the classroom. Are the credentials valid?'
      });
    }

    console.info(`classroom ${id} successfully found`);
    return res.status(200).json({ success: true });
  });
};

module.exports = getRoomWithPassword;
