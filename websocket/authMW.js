const tokenManager = require('../utils/tokenManager');

/*  Decrypts a token.

    PARAMS
      token (string): token to check
      resolve (function): called if the token is valid. Take one argument: user (decrypted token object)
      reject (function): called if the token is invalid.

    RETURN
      none
*/
const authMW = (token, resolve, reject) => {
  if (!reject) { reject = () => { } };

  tokenManager.decryptToken(token, decrypted => {
    if (decrypted === null) {
      reject();
    } else {
      resolve(decrypted);
    }
  });
};

module.exports = authMW;
