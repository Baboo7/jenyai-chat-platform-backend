const config = require('../configs/config');
const roomsCtrl = require('../database/controllers/rooms');

const getRoom = (req, res) => {
  console.info('route > get classroom');
  // Check parameters presence
  let id = req.params.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (id.length !== config.roomIdLength) {
    console.error('classroom id has not the right size');
    return res.status(200).json({
      success: false,
      message: 'The connection could not be established with the classroom. Is the classroom id correct?'
    });
  }

  // Check if room exist in database
  roomsCtrl.find(id, room => {
    if (room === null) {
      console.info('classroom not found');
      return res.status(200).json({
        success: false,
        message: 'The connection could not be established with the classroom. Is the classroom id correct?'
      });
    }

    console.info('classroom successfully found');
    return res.status(200).json({ success: true });
  });
};

module.exports = getRoom;
