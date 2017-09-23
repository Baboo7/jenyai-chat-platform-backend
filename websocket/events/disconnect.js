const utils = require('../utils');
let sockets = require('../sockets');

const disconnect = (id) => {
  let client = utils.getClient(sockets, id);
  if (client === null) {
    return;
  }
  console.log(`${client.emitterType} ${id} disconnected`);

  if (client.emitterType === 'student') {
    delete sockets.students[id];
    Object.keys(sockets.teachers).forEach(teacherId => {
      sockets.teachers[teacherId].socket.emit('del-student', { student: [ id ] });
    });
  } else if (client.emitterType === 'teacher') {
    delete sockets.teachers[id];
  }
};

module.exports = disconnect;
