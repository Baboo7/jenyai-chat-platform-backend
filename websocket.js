const uuidv4 = require('uuid/v4');

/*
  students and teachers have the following shape for a given id:
    · emitterType (string)
    · socket (socket object)
*/
let sockets = {
  students: { },
  teachers: { }
};

const setUpWebsocket = server => {
  let io = require('socket.io')(server);

  io.on('connection', socket => {
    let id = uuidv4();

    socket.on('init', data => {
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
    });

    socket.on('message', data => {
      console.log(`received: `, data);
      socket.emit('message',{payload: 'received'});
    });

    socket.on('disconnect', () => {
      console.log(`user disconnected`);
      if (sockets.students[id] !== undefined) {
        delete sockets.students[id];
        Object.keys(sockets.teachers).forEach(teacherId => {
          sockets.teachers[teacherId].socket.emit('del-student', { student: [ id ] });
        });
      } else if (sockets.teachers[id] !== undefined) {
        delete sockets.teachers[id];
      }
    });
  });
}

module.exports = setUpWebsocket;
