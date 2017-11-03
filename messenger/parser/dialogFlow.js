'use strict';

const utils = require('./utils');

/*  Parse a message comming from a dialogflow agent.

    PARAMS
      raw (object): message from the agent (see dialogflow documentation)
      recipient (object): recipient information

    RETURN
      array of parsed messages
*/
const parser = (raw, recipient) => {
  if (!raw
    ||!raw.result
    || !raw.result.fulfillment
    || !raw.result.fulfillment.messages) {
    return;
  }

  let messages = raw.result.fulfillment.messages;
  let parsedMsg = [];
  let align = 'left';
  messages.forEach(msg => {
    switch (msg.type) {
      case 0: // text message
        parsedMsg.push({
          emitter: 'dialogflow',
          emitterType: 'agent',
          recipient: recipient.socket.id,
          timestamp: new Date(),
          message: utils.parseText(msg.speech)
        });
      break;
    }
  });

  return parsedMsg;
}

module.exports = {
  parser: parser
};
