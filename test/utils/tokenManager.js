'use strict';
let tokenManager = require('../../utils/tokenManager');
let expect = require('chai').expect;

describe('tokenManager', () => {
  it('should encrypt and decrypt a message correctly', done => {
    let user = {
      roomId: 'a',
      type: 'b',
      id: 'c'
    };
    let encryptionKey = 'key';

    tokenManager.generateToken(user, token => {
      tokenManager.decryptToken(token, decrypted => {
        expect(decrypted).to.include(user);
        done();
      });
    });
  });
});
