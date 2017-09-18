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

/*  Returns the client associated to the given id.
    params:
      sockets (object)
      id (number)
    return: the client object or null if not found
*/
const getClient = (sockets, id) => {
  let client = null;
  if (sockets.students[id] !== undefined) {
    client = sockets.students[id];
  } else if (sockets.teachers[id] !== undefined) {
    client = sockets.teachers[id];
  } else {
    console.error(`no client found for id ${id}`);
  }

  return client;
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
      let client = getClient(sockets, id);
      if (client === null) {
        return;
      }
      console.log(`message received from ${client.emitterType} ${id}: `, data);

      if (client.emitterType === 'student') {
        Object.keys(sockets.teachers).forEach(teacherId => {
          sockets.teachers[teacherId].socket.emit('message',
          {
            emitter: id,
            message: {
              type: 'text',
              payload: data.payload
            }
          });
        });
      } else if (client.emitterType === 'teacher') {
        if (data.recipient) {
          let student = sockets.students[data.recipient];
          if (student !== undefined) {
            student.socket.emit('message',
            {
              emitter: id,
              message: {
                type: 'text',
                payload: data.payload
              }
            });
          }
        }
      }
    });

    socket.on('disconnect', () => {
      let client = getClient(sockets, id);
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
    });
  });
};

module.exports = setUpWebsocket;
