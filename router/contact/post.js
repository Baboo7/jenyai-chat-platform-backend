'use strict'
const waitinglistCtrl = require('../../database/controllers/waitinglist');
const mailConfig = require('../../configs/mail');
const mailer = require('../../utils/mailer');

/*  Sends an email with contact information and saves it in database.

    PARAMS
      req (object): request object. Must contains the following properties in its body property
        name (string): name of the user
        email (string): email of the user
        message (string): message of the user
        phone (string): phone of the user - optional parameter
      res (object): response object

    RETURN
      none
*/
const post = (req, res) => {
  // Check parameters presence
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let phone = req.body.phone || '';
  if (!name || !email || !message) {
    return res.status(200).json({ success: false });
  }

  // Check parameters properties
  if (typeof name !== 'string'
  || typeof email !== 'string'
  || typeof message !== 'string'
  || typeof phone !== 'string') {
    return res.status(200).json({ success: false });
  }

  // Save waiter information in database and send mail
  waitinglistCtrl.addWaiter(name, email, phone, message);

  let mailContent = {
    name: name,
    email: email,
    phone: phone,
    message: message
  };

  mailer.sendMail(mailConfig.user, 'new-waiter', mailContent);
  return res.status(200).json({ success: true });
};

module.exports = post;
