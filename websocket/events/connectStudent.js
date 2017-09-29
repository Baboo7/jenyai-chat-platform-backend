const utils = require('../utils');
let sockets = require('../sockets');

const connectStudent = (data, user) => {
  let emitter = utils.getClient(sockets, user);
  if (emitter === null) { return; }

  if (user.type !== 'teacher') {
    console.error(`${utils.strUser(user)} fired 'connect-student' event but is not a teacher`);
    return;
  }

  let sId = data.id;
  let recipient = utils.getClient(sockets, { userId: sId, roomId: user.roomId, type:'student' });
  if (recipient === null) {
    console.log(`can not connect ${utils.strUser(user)} to non existing student ${sId}`);
    return;
  }

  if (recipient.recipient !== undefined && recipient.recipient !== user.userId) {
    console.log(`can not connect ${utils.strUser(user)} to student ${sId} who is already connected to an other teacher`);
    return;
  }

  console.log(`${user.type} ${user.userId} connects to student ${sId}`);

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
