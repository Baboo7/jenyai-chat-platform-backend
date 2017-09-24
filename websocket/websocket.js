const uuidv4 = require('uuid/v4');

const eventHandler = require('./events');

const setUpWebsocket = server => {
  let io = require('socket.io')(server);

  io.on('connection', socket => {
    // user contains the userId and h.is.er type and roomId
    let user = {
      userId: uuidv4()
    }

    socket.on('init', data => { eventHandler.init(data, socket, user); });

    socket.on('message', data => { eventHandler.message(data, user); });

    socket.on('disconnect', () => { eventHandler.disconnect(user); });
  });
};

module.exports = setUpWebsocket;
