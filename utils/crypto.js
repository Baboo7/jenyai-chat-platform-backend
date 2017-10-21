'use strict';
const crypto = require('crypto');

/*  Encrypts a message.

    PARAMS
      message (string): message to encrypt
      callback (function): called once the encryption is done. Take one argument: encrypted (encrypted message)

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
      callback (function): called once the decryption is done. Take one argument: decrypted (decrypted message)

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
}

module.exports = {
  encrypt,
  decrypt
};
