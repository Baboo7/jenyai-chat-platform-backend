/*  Contains the configuration variables used to send emails */
const mail = {
  accessToken: process.env.EMAIL_ACCESS_TKN || '',
  user: process.env.EMAIL_USER || ''
};

module.exports = mail;
