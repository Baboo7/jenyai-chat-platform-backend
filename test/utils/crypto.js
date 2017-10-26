'use strict';
let crypto = require('../../utils/crypto');
let expect = require('chai').expect;

describe('crypto', () => {
  it('should encrypt and decrypt a message correctly', done => {
    let message = 'tok tok tok I am a token';
    let encryptionKey = 'key';

    crypto.encrypt(message, encryptionKey, encrypted => {
      crypto.decrypt(encrypted, encryptionKey, decrypted => {
        expect(decrypted).to.equal(message);
        done();
      });
    });
  });

  it('should raise an error trying to decrypt', done => {
    let message = 'I am not encrypted';
    let rightKey = 'rightKey';
    let wrongKey = 'wrongKey';

    crypto.encrypt(message, rightKey, encrypted => {
      crypto.decrypt(encrypted, wrongKey, decrypted => {
        expect(decrypted).to.equal(null);
        done();
      });
    });
  });
});
