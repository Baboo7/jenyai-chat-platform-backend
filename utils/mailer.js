const nodemailer = require('nodemailer');
const mailConfig = require('../configs/mail');
const mailTemplates = require('./mailTemplates');

/*  Sends a mail built from a template to recipients.

    PARAMS
      recipients (string): recipients email addresses joined by a comma
      templateName (string): name of the template to use (see ./mailTemplates for template mapping)
      templateData (object): extra data required to build the template (see the template specification in ./mailTemplates for more information)
      callback (function): optional - executed once the mail has been sent. Can take two parameters: err, infos

    RETURN
      none
*/
const sendMail = (recipients, templateName, templateData, callback) => {
  if (typeof callback === 'undefined') { callback = () => {}; }

  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass
    }
  });

  let mailContent = mailTemplates[templateName](templateData);

  let msg = {
    from: `JenyAI <${mailConfig.user}>`,
    to: recipients,
    subject: mailContent.subject,
    text: mailContent.text
  }

  transport.sendMail(msg, (err, infos) => {
    if (err) { console.error(err); }
    callback(err, infos);
  });
};

module.exports = {
  sendMail
};
