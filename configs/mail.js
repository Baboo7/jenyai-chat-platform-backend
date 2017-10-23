/*  Contains the configuration variables used to send emails */
const mail = {
  clientId: process.env.EMAIL_CLIENT_ID || '',
  clientSecret: process.env.EMAIL_CLIENT_SECRET || '',
  refreshToken: process.env.EMAIL_REFRESH_TKN || '',
  accessToken: process.env.EMAIL_ACCESS_TKN || '',
  user: process.env.EMAIL_USER || ''
};

module.exports = mail;
