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

  //  check global message format
  if (!data
    || !data.type
    || !data.payload)
    return null;

  let payload = data.payload;
  let msg = { };

  //  build meta message

  //  incoming TEXT message
  if (data.type === 'text') {

    if (!payload.text
      || utils.isEmpty(payload.text)
      || !payload.media)
      return null

    msg = utils.parseText(payload.text);
    msg.media = payload.media;
  }

  //  incoming EVENT message
  else if (data.type === 'event') {

    if (!payload.event
      || utils.isEmpty(payload.event))
      return null

    msg.type = 'event';
    msg.event = payload.event;
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
