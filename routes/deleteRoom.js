const config = require('../configs/config');
const sockets = require('../websocket/sockets');

const deleteRoom = (req, res) => {
  console.info('route > delete classroom');
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

  delete sockets[id];
  console.info('classroom successfully deleted');
  return res.status(200).json({ success: true });
};

module.exports = deleteRoom;
