const sockets = require('../websocket/sockets');

const getClassroom = (req, res) => {
  console.info('route > get classroom');
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

  console.info('classroom successfully found');
  return res.status(200).json({ success: true });
};

module.exports = getClassroom;
