const createRoom = require('./createRoom');
const deleteRoom = require('./deleteRoom');
const getRoom = require('./getRoom');
const getRoomWithPassword = require('./getRoomWithPassword');

const routes = {
  createRoom,
  deleteRoom,
  getRoom,
  getRoomWithPassword
};

module.exports = routes;
