const config = require('../config/config');
const sockets = require('../websocket/sockets');
const utils = require('../websocket/utils');

const deleteClassroom = (req, res) => {
  console.info('route > delete classroom');
  let id = req.params.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  if (id.length !== config.classroomIdLength) {
    console.error('classroom id has not the right size');
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
