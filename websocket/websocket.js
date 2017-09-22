const uuidv4 = require('uuid/v4');

const eventHandler = require('./events');

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

    socket.on('init', data => { eventHandler.init(data, sockets, socket, id); });

    socket.on('message', data => { eventHandler.message(data, sockets, id); });

    socket.on('disconnect', () => { eventHandler.disconnect(sockets, id); });
  });
};

module.exports = setUpWebsocket;
