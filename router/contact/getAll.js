'use strict';
const fs = require('fs');

const config = require('../../configs/config');
const waitinglistCtrl = require('../../database/controllers/waitinglist');

/*  Get the whole waiting list from the database.

    PARAMS
      req (object): request object
      res (object): response object

    RETURN
      none
*/
const getAll = (req, res) => {
  let file = `${config.tmpPath}/waitinglist.csv`
  let fd = fs.open(file, 'w', (err, fd) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ success: false });
    }

    // Retrieve conversations from database
    waitinglistCtrl.getAllWaiters(waitinglist => {
      fs.writeSync(fd, 'name, email, phone, message\n');

      waitinglist.forEach(w => {
        let line = '';

        line += w.name;
        line += ',' + w.email;
        line += ',' + w.phone;
        line += ',' + w.message;

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
            'content-disposition': `attachment; filename="waitinglist-${(new Date()).toJSON()}.csv"`
          }
        };

        return res.status(200).sendFile(file, options);
      });
    });
  });
};

module.exports = getAll;
