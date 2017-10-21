const config = require('../configs/config');
const crypto = require('./crypto');

/*  Decrypts a token.

    PARAMS
      token (string): token to decrypt
      callback (function): called once the token has been decrypted. Take one argument: decrypted (decrypted token)

    RETURN
      none
*/
const decryptToken = (token, callback) => {
  crypto.decrypt(token, config.encryptionKey, decrypted => {
    try {
      callback(JSON.parse(decrypted));
    } catch (err) {
      callback(null);
    }
  });
};

/*  Generates an encrypted token.

    PARAMS
      user (object): represents a path in the sockets object
      callback (function): called once the token has been generated. Take one argument: encrypted (encrypted token)

    RETURN
      none
*/
const generateToken = (user, callback) => {
  let infos = Object.assign({}, user);
  infos.iat = new Date();

  crypto.encrypt(JSON.stringify(infos), config.encryptionKey, encrypted => {
    callback(encrypted);
  });
};

module.exports = {
  decryptToken,
  generateToken
};
