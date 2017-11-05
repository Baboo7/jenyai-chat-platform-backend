'use strict';

/*  Adapt an array of messages to a user.

    PARAMS
      messages (array of objects): messages to adapt
      user (object): user to adapt the message to

    RETURN
    (array of objects): messages adapted to the user
*/
const fromUserToUser = (messages, user) => {
  let adaptedMessages = Object.assign([ ], messages);

  adaptedMessages.forEach(msg => {
    if (user.type === 'student') {
      msg.align = msg.emitterType === 'student' ? 'right' : 'left';
    } else if (user.type === 'teacher') {
      msg.align = (msg.emitterType === 'teacher' || msg.emitterType === 'agent') ? 'right' : 'left';

      if (msg.emitterType === 'agent') {
        msg.emitterType === 'teacher';
      }
    }
  });

  return adaptedMessages;
};

module.exports = fromUserToUser;
