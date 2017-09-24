const utils = require('../utils');
let sockets = require('../sockets');

const disconnect = (user) => {
  let client = utils.getClient(sockets, user);
  if (client === null) {
    return;
  }
  console.log(`${user.type} ${user.userId} disconnected`);

  delete sockets[user.roomId][user.type][user.userId];
  if (user.type === 'student') {
    Object.keys(sockets[user.roomId]['teacher']).forEach(id => {
      sockets[user.roomId]['teacher'][id].socket.emit('del-student', { student: [ user.userId ] });
    });
  }
};

module.exports = disconnect;
