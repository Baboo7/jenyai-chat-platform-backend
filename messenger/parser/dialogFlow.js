'use strict'

const utils = require('./utils')

/*  Parse a message comming from a dialogflow agent.

    PARAMS
      raw (object): message from the agent (see dialogflow documentation)
      recipient (object): recipient information

    RETURN
      array of parsed messages
*/
const parser = (raw, recipient) => {
  if (!raw ||!raw.result || !raw.result.fulfillment || !raw.result.fulfillment.messages) {
    return
  }

  let messages = raw.result.fulfillment.messages
  let intentName = raw.result.metadata.intentName
  let confidence = raw.result.score
  let align = 'left'

  let parsedMsg = [ ]
  messages.forEach((msg, msgId) => {
    let metamsg = {
      emitter: 'dialogflow',
      emitterType: 'agent',
      recipient: recipient.socket.id,
      timestamp: new Date(),
      msgId: msgId + 1,
      intentName: intentName,
      confidence: confidence
    }

    switch (msg.type) {
      case 0: // text message
        metamsg.message = utils.parseText(msg.speech)
        break

      case 4: // custom payload
        let payload = msg.payload

        // IMAGE message
        if (payload.type === 'image' && payload.src) {
          metamsg.message = payload
        }
        // QUICK REPLIES message
        else if (payload.type === 'quick-replies' && payload.replies && payload.replies.length > 0) {
          metamsg.message = payload
        }
        break
    }

    if (metamsg.message) {
      parsedMsg.push(metamsg)
    }
  })

  return parsedMsg
}

module.exports = {
  parser: parser
}
