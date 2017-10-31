/*  Adapt a message to a user.

    PARAMS
      message (object): message to adapt
      user (object): user to adapt the message to

    RETURN
      (object): message adapted to the user
*/
const toUser = (message, user) => {
  let msg = Object.assign({}, message);

  msg = Object.assign(msg, message.message);
  msg.align = message.emitter === user.socket.id ? 'right' : 'left';

  delete msg.message;

  return msg;
};

module.exports = toUser;
