const axios = require('axios');

const dialogFlowConfig = require('../../configs/dialogFlow');

/*  Send a message to the dialogflow agent.

    PARAMS
      query (string): text message to send
      sessionId (string|number): unique session id
      callback (function): called when the agent's response is received. Take one argument:
        data (object): response object (see dialogflow documentation)

    RETURN
      none
*/
const sendMessage = (query, sessionId, callback) => {

  let headers = {
    'Authorization': `Bearer ${dialogFlowConfig.clientKey}`,
    'Content-Type': 'application/json; charset=utf-8'
  };

  let body = {
    sessionId: sessionId,
    lang: 'en',
    query: query
  };

  axios({
    url: dialogFlowConfig.url,
    method: 'post',
    headers: headers,
    data: body
  })
  .then(res => {
    callback(res.data);
  })
  .catch(err => console.log(err));
}

module.exports = {
  sendMessage: sendMessage
};
