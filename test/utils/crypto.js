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

  describe('HMAC SHA256', () => {

    it('should produce the same hash for the same input', done => {
      let message = 'I am text';
      let encryptionKey = 'key';

      crypto.hmacSha256(message, encryptionKey, encrypted1 => {
        crypto.hmacSha256(message, encryptionKey, encrypted2 => {
          expect(encrypted1).to.equal(encrypted2);
          done();
        });
      });
    });

    it('should produce different hashes for different inputs', done => {
      let m1 = 'I am text';
      let m2 = 'iem taxt';
      let encryptionKey = 'key';
      
      crypto.hmacSha256(m1, encryptionKey, encrypted1 => {
        crypto.hmacSha256(m2, encryptionKey, encrypted2 => {
          expect(encrypted1).to.not.equal(encrypted2);
          done();
        });
      });
    });

  });
});
