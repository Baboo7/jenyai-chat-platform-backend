const config = require('../configs/config');
const roomsCtrl = require('../database/controllers/rooms');

const createRoom = (req, res) => {
  console.info('route > create classroom');

  // Check parameters presence
  let id = req.body.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  let password = req.body.password;
  if (password === undefined) {
    console.error('missing password parameter');
    return res.status(200).json({ success: false });
  }

  let teachers = req.body.teachers;
  if (teachers === undefined) {
    console.error('missing teachers parameter');
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (id.length !== config.roomIdLength) {
    console.error(`classroom id ${id} has not the right size`);
    return res.status(200).json({ success: false });
  }

  if (password.length !== config.passwordLength) {
    console.error(`classroom password ${password} has not the right size`);
    return res.status(200).json({ success: false });
  }

  if (!Array.isArray(teachers)) {
    console.error(`teachers parameters has to be an array of strings`);
    return res.status(200).json({ success: false });
  }

  // Create room if doesn't exist
  roomsCtrl.find(id, room => {
    if (room !== null) {
      console.warn('classroom already exists');
      return res.status(200).json({ success: false });
    }

    roomsCtrl.create(id, password, teachers, () => {
      console.info(`classroom ${id} successfully created`);
      return res.status(200).json({ success: true });
    });
  });
};

module.exports = createRoom;
