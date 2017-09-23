const sockets = require('../websocket/sockets');
const utils = require('../websocket/utils');

const deleteClassroom = (req, res) => {
  console.info('route > delete classroom');
  let id = req.params.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  if (id.length > 6) {
    console.error('classroom id too long');
    return res.status(200).json({ success: false });
  }

  if (sockets[id] === undefined) {
    console.info('classroom not found');
    return res.status(200).json({ success: false });
  }

  utils.deleteClassroom(sockets, id);
  console.info('classroom successfully deleted');
  return res.status(200).json({ success: true });
};

module.exports = deleteClassroom;
