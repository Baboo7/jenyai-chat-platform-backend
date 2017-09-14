const uuidv4 = require('uuid/v4');

let clients = {
  students: {},
  teachers: {}
};

const setUpWebsocket = server => {
  let io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log(`new user connected`);

    socket.on('get-uuid', data => {
      let id = uuidv4();
      socket.emit('set-uuid', {id: id});
    });

    socket.on('message', data => {
      console.log(`received: `, data);
      socket.emit('message',{payload: 'received'});
    });

    socket.on('disconnect', () => {
      console.log(`user disconnected`);
    });
  });
}

module.exports = setUpWebsocket;
