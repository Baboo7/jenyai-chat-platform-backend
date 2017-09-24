const utils = require('../utils');
let sockets = require('../sockets');

const connectStudent = (data, user) => {
  let emitter = utils.getClient(sockets, user);
  if (emitter === null) {
    return;
  }

  if (user.type !== 'teacher') {
    console.error(`${utils.strUser(user)} fired 'connect-student' event but is not a teacher`);
    return;
  }

  let sId = data.id;
  let recipient = utils.getClient(sockets, { userId: sId, roomId: user.roomId, type:'student' });
  if (recipient === null) {
    console.log(`could not connect ${user.type} ${user.userId} to student ${sId}`);
    return;
  }

  let formerRecipient = utils.getClient(sockets, { userId: emitter.recipient, roomId: user.roomId, type:'student' });

  console.log(`${user.type} ${user.userId} connects to student ${sId}`);
  if (formerRecipient !== null) {
    delete formerRecipient.recipient;
  }
  emitter.recipient = sId;
  recipient.recipient = user.userId;

  emitter.socket.emit(
    'connect-student',
    {
      id: sId
    }
  );
};

module.exports = connectStudent;
