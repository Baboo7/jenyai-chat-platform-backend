const createRoom = require('./createRoom');
const deleteRoom = require('./deleteRoom');
const getRoom = require('./getRoom');

const routes = {
  createRoom,
  deleteRoom,
  getRoom
};

module.exports = routes;
