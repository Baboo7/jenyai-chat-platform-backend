const conversations = require('../models').conversations;

/*  Adds a message in the database.

    PARAMS
      uuid (number): id of the conversation
      timestamp (date): message issuance date
      message (object): message to save

    RETURN
      none
*/
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

/*  Retrieves all messages of all conversations.

    PARAMS
      callback (function): called when the messages have been retrieved. Take one argument: data (array of object)

    RETURN
      none
*/
const retrieveAll = (callback) => {
  return conversations
  .findAll({
    order: [ [ 'timestamp', 'ASC' ] ],
    raw: true
  })
  .then(data => callback(data))
  .catch(err => console.error(err))
};

/*  Retrieves all messages of a specific conversation.

    PARAMS
      uuid (number): id of the conversation
      callback (function): called when the messages have been retrieved. Take one argument: data (array of object)

    RETURN
      none
*/
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
  retrieveAll,
  retrieveMessagesById
};
