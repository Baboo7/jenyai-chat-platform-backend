const config = require('../config');
const sockets = require('../websocket/sockets');

const getRoomWithPassword = (req, res) => {
  console.info('route > get classroom with password');
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

  if (id.length !== config.roomIdLength) {
    console.error(`classroom id ${id} has not the right size`);
    return res.status(200).json({ success: false });
  }

  if (sockets[id] === undefined) {
    console.info(`classroom ${id} not found`);
    return res.status(200).json({ success: false });
  } else if (password !== sockets[id].password) {
    console.info(`wrong password ${password} for room ${id}`);
    return res.status(200).json({ success: false });
  }

  console.info(`classroom ${id} successfully found`);
  return res.status(200).json({ success: true });
};

module.exports = getRoomWithPassword;
