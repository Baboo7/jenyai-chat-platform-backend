'use strict';

const utils = require('./utils');

/*  Parse a message.

    PARAMS
      data (object): message data
      user (object): user information

    RETURN
      (object): parsed message or null if invalid
*/
const parser = (data, user) => {
  if (!data
    || !data.type
    || !data.payload)
    return null;

  let payload = data.payload;
  let msg = { };

  if (data.type === 'text') {

    if (!payload.text
      || utils.isEmpty(payload.text)
      || !payload.media)
      return null

    msg = utils.parseText(payload.text);
    msg.media = payload.media;
  } else
    return null;

  let metamsg = {
    emitter: user.socket.id,
    emitterType: user.type,
    recipient: user.recipient,
    timestamp: new Date(),
    message: msg
  };

  return metamsg;
};

module.exports = {
  parser
};
