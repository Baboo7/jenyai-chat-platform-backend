/*  Contains the configuration variables used to send emails */
const mail = {
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASS || ''
};

module.exports = mail;
