let sockets = require('../sockets');

const init = (data, socket, user) => {
  let emitterType = data.emitterType;
  let name = data.name;
  let roomId = data.roomId;

  if (['student', 'teacher'].indexOf(emitterType) === -1) {
    console.error(`unexpected emitter type ${emitterType}`);
    return;
  }

  if (sockets[roomId] === undefined) {
    console.error(`room ${roomId} not found`);
    return;
  }

  user.type = emitterType;
  user.roomId = roomId;

  console.log(`new ${emitterType} ${name} (${user.userId}) connected to room ${roomId}`);
  sockets[roomId][emitterType][user.userId] = { name, socket };
  if (emitterType === 'student') {
    Object.keys(sockets[roomId]['teacher']).forEach(id => {
      sockets[roomId]['teacher'][id].socket.emit(
        'new-students',
        { students: [ { id: user.userId, name } ] }
      );
    });
  } else if (emitterType === 'teacher') {
    let connectedStudents = [ ];
    Object.keys(sockets[roomId]['student']).forEach(id => {
      connectedStudents.push({
        id,
        name: sockets[roomId]['student'][id].name
      });
    });
    socket.emit(
      'new-students',
      { students: connectedStudents }
    );
  }
};

module.exports = init;
