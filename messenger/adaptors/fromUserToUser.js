/*  Adapt a message to a user.

    PARAMS
      message (object): message to adapt
      user (object): user to adapt the message to

    RETURN
      (object): message adapted to the user
*/
const fromUserToUser = (message, user) => {
  let msg = Object.assign({}, message);

  msg.align = message.emitter === user.socket.id ? 'right' : 'left';

  return msg;
};

module.exports = fromUserToUser;
