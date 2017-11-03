const config = require('../configs/config');
const crypto = require('./crypto');

/*  -------------------

    a Token Object contains:
      userName (string): name of the user
      userType (string): type of the user
      roomName (string): name of the room
      
--  ------------------- */

/*  Decode a string in base 64.

    PARAMS
      str (string): string to decrypt

    RETURN
      (string) decoded string
*/
const base64Decode = (str) => {
  return (new Buffer(str, 'base64')).toString('utf8');
};

/*  Encode a string in base 64.

    PARAMS
      str (string): string to encrypt

    RETURN
      (string) encoded string
*/
const base64Encode = (str) => {
  return (new Buffer(str, 'utf8')).toString('base64');
};

/*  Decrypts a token.

    PARAMS
      token (string): token to decrypt
      callback (function): called once the token has been decrypted. Take one argument: decrypted (decrypted token)

    RETURN
      Token Object or null if invalid
*/
const decryptToken = (token, callback) => {
  let pieces = token.split('.');

  let encodedPayload = pieces[0];
  let originalSignature = pieces[1];

  crypto.hmacSha256(encodedPayload, config.encryptionKey, signature => {
    if (signature === originalSignature) {
      try {
        let payload = JSON.parse(base64Decode(encodedPayload));

        let info = {
          userName: payload.unm,
          userType: payload.utp,
          roomName: payload.rnm
        };

        callback(info);
      } catch (err) { callback(null); }
    } else { callback(null); }
  });
};

/*  Generates an encrypted token.

    PARAMS
      info (Token Object): information to encrypt in the token
      callback (function): called once the token has been generated. Take one argument: encrypted (encrypted token)

    RETURN
      none
*/
const generateToken = (info, callback) => {
  let payload = {
    unm: info.userName,
    utp: info.userType,
    rnm: info.roomName,
    iat: new Date()
  };

  let encodedPayload = base64Encode(JSON.stringify(payload));

  crypto.hmacSha256(encodedPayload, config.encryptionKey, signature => {
    let token = encodedPayload + '.' + signature;

    callback(token);
  });
};

module.exports = {
  decryptToken,
  generateToken
};
