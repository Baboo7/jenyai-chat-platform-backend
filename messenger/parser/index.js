const userManager = require('../../websocket/managers/user');
const dialogFlow = require('./dialogFlow');
const platform = require('./platform');

/*  Parse a message.

    PARAMS
      data (object): message to send
      user (object): emitter information
      recipient (object): recipient information

    RETURN
      array of messages
*/
const parser = (data, user, recipient) => {
  let messages = [ ];

  if (userManager.isStudent(user) || userManager.isTeacher(user)) {
    messages.push(platform.parser(data, user));
  } else if (user.type === 'agent') {
    messages = dialogFlow.parser(data, recipient);
  }

  return messages;
};

module.exports = parser;
