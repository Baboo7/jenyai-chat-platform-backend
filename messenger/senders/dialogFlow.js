const axios = require('axios');

const dialogFlowConfig = require('../../configs/dialogFlow');

/*  Send a message to the dialogflow agent.

    PARAMS
      message (object): message to send to the agent (see message type)
      sessionId (string|number): unique session id
      callback (function): called when the agent's response is received. Take two arguments:
        err (boolean): true if an error was triggered, false otherwise
        data (object): response object (see dialogflow documentation), undefined if error true

    RETURN
      none
*/
const sendMessage = (message, sessionId, callback) => {

  // check if the message has a valid type
  let validTypes = ['text', 'event'];
  if (!validTypes.includes(message.type)) callback(true);

  let headers = {
    'Authorization': `Bearer ${dialogFlowConfig.clientKey}`,
    'Content-Type': 'application/json; charset=utf-8'
  };

  let body = {
    sessionId: sessionId,
    lang: 'en'
  };

  // adapt body request to message type

  // TEXT message
  if (message.type === 'text') {
    body.query = message.text;
  }

  // EVENT message
  else {
    body.event = {
      name: message.event
    };
  }

  // send the request to the agent
  axios({
    url: dialogFlowConfig.url,
    method: 'post',
    headers: headers,
    data: body
  })
  .then(res => {
    callback(false, res.data);
  })
  .catch(err => {
    console.log(err);
    callback(true);
  });
}

module.exports = {
  sendMessage: sendMessage
};
