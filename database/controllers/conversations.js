const conversations = require('../models').conversations;

const addMessage = (uuid, timestamp, message) => {
  return conversations
  .create({
    uuid,
    timestamp,
    message: JSON.stringify(message)
  })
  .then()
  .catch(err => console.error(err))
};

const retrieveMessagesById = (uuid, callback) => {
  return conversations
  .findAll({
    attributes: [ 'message' ],
    where: { uuid },
    order: [ [ 'timestamp', 'ASC' ] ],
    raw: true
  })
  .then(data => callback(data))
  .catch(err => console.error(err))
};

module.exports = {
  addMessage,
  retrieveMessagesById
};
