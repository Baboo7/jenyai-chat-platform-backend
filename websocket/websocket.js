const uuidv4 = require('uuid/v4');

const authMW = require('./authMW');
const eventHandler = require('./events');

const setUpWebsocket = server => {
  let io = require('socket.io')(server);

  io.on('connection', socket => {

    socket.on('init', data => {
      authMW(data.token,
        // valid token
        decryptedToken => eventHandler.init(socket, decryptedToken),
        // On invalid token
        () => {
          socket.disconnect(true);
        });
    });

    socket.on('connect-student', data => eventHandler.connectStudent(data, socket.id));

    socket.on('message', data => eventHandler.message(data, socket.id));

    socket.on('typing-off', () => eventHandler.typingIndicatorHandler(socket.id, 'typing-off'));

    socket.on('typing-on', () => eventHandler.typingIndicatorHandler(socket.id, 'typing-on'));

    socket.on('disconnect', () => eventHandler.disconnect(socket.id));
  });
};

module.exports = setUpWebsocket;
