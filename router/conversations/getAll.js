'use strict';
const fs = require('fs');

const config = require('../../configs/config');
const conversationsCtrl = require('../../database/controllers/conversations');

/*  Compute a csv line.

    PARAMS
      properties (array of strings): set of strings to concat

    RETURN
      (string) computed line
*/
const createCSVLine = properties => {
  let line = '"';
  line += properties.join('","');
  line += '"\n';

  return line
};

/*  Gets all conversations from the database.

    PARAMS
      req (object): request object
      res (object): response object

    RETURN
      none
*/
const getAll = (req, res) => {
  let file = `${config.tmpPath}/conversations.csv`
  let fd = fs.open(file, 'w', (err, fd) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ success: false });
    }

    // Retrieve conversations from database
    conversationsCtrl.retrieveAll(conversations => {
      let header = [
        'conversation id',
        'issuance date',
        'message',
        'room',
        'emitter id',
        'emitter type',
        'emitter name',
        'recipient id',
        'recipient type',
        'recipient name'
      ];

      fs.writeSync(fd, createCSVLine(header));

      conversations.forEach(c => {
        let msg = JSON.parse(c.message);

        let text = ' ';
        if (msg.message.type === 'text') { text = msg.message.text; }
        else if (msg.message.type === 'video') { text = msg.message.url; }
        else if (msg.message.type === 'image') { text = msg.message.src; }

        let lineProperties = [
          c.uuid,
          c.timestamp,
          text,
          msg.room,
          msg.emitter,
          msg.emitterType,
          msg.emitterName,
          msg.recipient,
          msg.recipientType,
          msg.recipientName,
        ];

        fs.writeSync(fd, createCSVLine(lineProperties));
      });

      fs.close(fd, err => {
        if (err) {
          console.log(err);
          return res.status(200).json({ success: false });
        }

        let options = {
          headers: {
            'content-disposition': `attachment; filename="conversations-${(new Date()).toJSON()}.csv"`
          }
        };

        return res.status(200).sendFile(file, options);
      });
    });
  });
};

module.exports = getAll;
