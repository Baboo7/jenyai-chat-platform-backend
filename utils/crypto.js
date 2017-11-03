'use strict';
const crypto = require('crypto');

/*  Encrypts a message.

    PARAMS
      message (string): message to encrypt
      encryptionKey (string): key to use
      callback (function): called once the encryption is done. Take one argument:
        encrypted (string): encrypted message

    RETURN
      none
*/
const encrypt = (message, encryptionKey, callback) => {
  const cipher = crypto.createCipher('aes192', encryptionKey);
  let encrypted = '';
  cipher.on('readable', () => {
    const data = cipher.read();
    if (data) {
      encrypted += data.toString('hex');
    }
  });
  cipher.on('end', () => {
    callback(encrypted);
  });

  cipher.write(message);
  cipher.end();
};

/*  Decrypts a message.

    PARAMS
      message (string): message to decrypt
      encryptionKey (string): key to use
      callback (function): called once the decryption is done. Take one argument:
        decrypted (string): decrypted message

    RETURN
      none
*/
const decrypt = (message, encryptionKey, callback) => {
  const decipher = crypto.createDecipher('aes192', encryptionKey);

  let decrypted = '';
  decipher.on('readable', () => {
    const data = decipher.read();
    if (data) {
      decrypted += data.toString('utf8');
    }
  });
  decipher.on('end', () => {
    callback(decrypted);
  });

  try {
    decipher.write(message, 'hex');
    decipher.end();
  } catch(e) {
    callback(null);
  }
};

/*  Encrypt a message in HMAC-SHA256.

    PARAMS
      message (string): message to encrypt
      encryptionKey (string): key to use
      callback (function): called once the encryption is done. Take one argument:
        encrypted (string): encrypted message

    RETURN
      none
*/
const hmacSha256 = (message, encryptionKey, callback) => {
  const hmac = crypto.createHmac('sha256', encryptionKey);

  let encrypted = '';
  hmac.on('readable', () => {
    const data = hmac.read();
    if (data) {
      encrypted += data.toString('hex');
    }
  });
  hmac.on('end', () => {
    callback(encrypted);
  });

  hmac.write(message);
  hmac.end();
};

module.exports = {
  encrypt,
  decrypt,
  hmacSha256
};
