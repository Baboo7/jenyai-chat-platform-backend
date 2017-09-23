const uuidv4 = require('uuid/v4');

const eventHandler = require('./events');

const setUpWebsocket = server => {
  let io = require('socket.io')(server);

  io.on('connection', socket => {
    let id = uuidv4();

    socket.on('init', data => { eventHandler.init(data, socket, id); });

    socket.on('message', data => { eventHandler.message(data, id); });

    socket.on('disconnect', () => { eventHandler.disconnect(id); });
  });
};

module.exports = setUpWebsocket;
