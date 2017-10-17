const uuidv4 = require('uuid/v4');

const eventHandler = require('./events');

const setUpWebsocket = server => {
  let io = require('socket.io')(server);

  io.on('connection', socket => {
    // user contains roomId, userId, type (teacher or student)
    let user = {
      userId: uuidv4()
    }

    socket.on('init', data => { eventHandler.init(data, socket, user); });

    socket.on('connect-student', data => { eventHandler.connectStudent(data, user); });

    socket.on('message', data => { eventHandler.message(data, user); });

    socket.on('typing-off', data => { eventHandler.typingIndicatorHandler(data, user, 'typing-off'); });

    socket.on('typing-on', data => { eventHandler.typingIndicatorHandler(data, user, 'typing-on'); });

    socket.on('disconnect', () => { eventHandler.disconnect(user); });
  });
};

module.exports = setUpWebsocket;
