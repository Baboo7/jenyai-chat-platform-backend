const controller = require('../../database/models').conversations

/*  Delete all the conversation from the database.

    PARAMS
      req (object): request object
      res (object): response object

    RETURN
      none
*/
const route = (req, res) => {
  controller
  .destroy({
    where: { }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(e => {
    res.sendStatus(500);
    console.error(e);
  })
}

module.exports = route
