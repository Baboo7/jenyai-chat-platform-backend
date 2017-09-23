const sockets = require('../websocket/sockets');
const utils = require('../websocket/utils');

const createClassroom = (req, res) => {
  console.info('route > create classroom');
  let id = req.body.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  if (id.length > 6) {
    console.error('classroom id too long');
    return res.status(200).json({ success: false });
  }

  if (sockets[id] !== undefined) {
    console.warn('classroom already exists');
    return res.status(200).json({ success: false });
  }

  sockets[id] = utils.createClassroom();
  console.info('classroom successfully created');
  return res.status(200).json({ success: true });
};

module.exports = createClassroom;
