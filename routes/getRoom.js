const config = require('../config');
const sockets = require('../websocket/sockets');

const getRoom = (req, res) => {
  console.info('route > get classroom');
  let id = req.params.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  if (id.length !== config.roomIdLength) {
    console.error('classroom id has not the right size');
    return res.status(200).json({
      success: false,
      message: 'The connection could not be established with the classroom. Is the classroom id correct?' 
    });
  }

  if (sockets[id] === undefined) {
    console.info('classroom not found');
    return res.status(200).json({
      success: false,
      message: 'The connection could not be established with the classroom. Is the classroom id correct?' 
    });
  }

  console.info('classroom successfully found');
  return res.status(200).json({ success: true });
};

module.exports = getRoom;
