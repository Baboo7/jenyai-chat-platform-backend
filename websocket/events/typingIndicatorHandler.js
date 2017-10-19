const userManager = require('../managers/user');
let sockets = require('../sockets');

const typingIndicatorHandler = (data, user, evt) => {
  let emitter = userManager.getEmitter(sockets, user);
  if (emitter === null) {
    return;
  }

  let recipientType = userManager.mirrorType(user);
  let recipient = userManager.getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: recipientType });
  if (recipient === null) { return; }

  let msg = {
    emitter: user.userId
  };
  recipient.socket.emit(evt, msg);
};

module.exports = typingIndicatorHandler;
