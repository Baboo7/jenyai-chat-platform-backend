'use strict';
const fs = require('fs');

const config = require('../../configs/config');
const conversationsCtrl = require('../../database/controllers/conversations');

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
      fs.writeSync(fd, 'conversation id, issuance date, message, room, emitter id, emitter type, emitter name, recipient id, recipient type, recipient name\n');

      conversations.forEach(c => {
        let msg = JSON.parse(c.message);

        let line = '';

        line += c.uuid;
        line += ',' + c.timestamp;
        if (msg.message.type === 'text') { line += `,"${msg.message.text}"`; }
        else if (msg.message.type === 'video') { line += `,"${msg.message.url}"`; }
        else { line += ','; }
        line += ',' + msg.room;
        line += ',' + msg.emitter;
        line += ',' + msg.emitterType;
        line += ',' + msg.emitterName;
        line += ',' + msg.recipient;
        line += ',' + msg.recipientType;
        line += ',' + msg.recipientName;

        line += '\n';
        fs.writeSync(fd, line);
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
