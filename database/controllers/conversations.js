const conversations = require('../models').conversations;

const addMessage = (uuid, timestamp, message) => {
  return conversations
    .create({
      uuid,
      timestamp,
      message: JSON.stringify(message)
    })
    .then(data => console.log('message: ', data))
    .catch(err => console.error(err))
};

module.exports = {
  addMessage
};
