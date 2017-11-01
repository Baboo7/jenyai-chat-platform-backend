'use strict';

/*  Adapt a message to a user.

    PARAMS
      message (object): message to adapt
      user (object): user to adapt the message to

    RETURN
      (object): message adapted to the user
*/
const fromUserToUser = (message, user) => {
  let msg = Object.assign({}, message);

  if (user.type === 'student') {
    msg.align = message.emitterType === 'student' ? 'right' : 'left';
  } else if (user.type === 'teacher') {
    msg.align = (message.emitterType === 'teacher' || message.emitterType === 'agent') ? 'right' : 'left';

    if (msg.emitterType === 'agent') {
      msg.emitterType === 'teacher';
    }
  }

  return msg;
};

module.exports = fromUserToUser;
