let sockets = require('../sockets');

const init = (data, socket, id) => {
  let emitterType = data.emitterType;
  console.log(`new ${emitterType} connected ${id}`);

  if (emitterType === 'student') {
    sockets.students[id] = { emitterType, socket };
    Object.keys(sockets.teachers).forEach(teacherId => {
      sockets.teachers[teacherId].socket.emit('new-students', { students: [ id ] });
    });
  } else if (emitterType === 'teacher') {
    sockets.teachers[id] = { emitterType, socket };
    socket.emit('new-students', { students: Object.keys(sockets.students) });
  } else {
    console.error('unexpected emitter type', emitterType, socket);
  }

  socket.emit('set-id', {id: id});
};

module.exports = init;
