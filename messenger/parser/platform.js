'use strict';

const utils = require('./utils');

/*  Parses a message.

    PARAMS
      data (object): message data
      user (object): user information

    RETURN
      (object): parsed message or null if invalid
*/
const parser = (data, user) => {
  if (!data || utils.isEmpty(data.payload)) { return null; }

  let metamsg = {
    emitter: user.socket.id,
    emitterType: user.type,
    recipient: user.recipient,
    timestamp: new Date(),
    message: utils.parseText(data.payload)
  };

  return metamsg;
};

module.exports = {
  parser
};
