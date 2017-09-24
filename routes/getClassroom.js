const config = require('../config');
const sockets = require('../websocket/sockets');

const getClassroom = (req, res) => {
  console.info('route > get classroom');
  let id = req.params.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  if (id.length !== config.roomIdLength) {
    console.error('classroom id has not the right size');
    return res.status(200).json({ success: false });
  }

  if (sockets[id] === undefined) {
    console.info('classroom not found');
    return res.status(200).json({ success: false });
  }

  console.info('classroom successfully found');
  return res.status(200).json({ success: true });
};

module.exports = getClassroom;
