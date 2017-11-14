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

    // event messages cant be sent to users
    if (msg.message.type === 'event') return;

    // adapt message to STUDENT
    if (user.type === 'student') {

      msg.align = msg.emitterType === 'student' ? 'right' : 'left';
    }

    // adapt message to TEACHER
    else if (user.type === 'teacher') {

      // convert quick replies message to text message
      if (msg.message.type === 'quick-replies') {

        let newMsg = {
          type: 'text',
          text: 'quick replies: ' + msg.message.replies.join(',')
        };

        msg.message = newMsg;
      }

      msg.align = (msg.emitterType === 'teacher' || msg.emitterType === 'agent') ? 'right' : 'left';

      if (msg.emitterType === 'agent') {
        msg.emitterType === 'teacher';
      }
    }
  });

  return adaptedMessages;
};

module.exports = fromUserToUser;
