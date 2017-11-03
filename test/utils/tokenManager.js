'use strict';
let tokenManager = require('../../utils/tokenManager');
let expect = require('chai').expect;

describe('tokenManager', () => {
  it('should encrypt and decrypt a token correctly', done => {
    let info = {
      userName: 'a',
      userType: 'b',
      roomName: 'é'
    };

    tokenManager.generateToken(info, token => {
      tokenManager.decryptToken(token, decrypted => {
        expect(decrypted).to.deep.equal(info);
        done();
      });
    });
  });

  it('should return null from a modified token', done => {
    let info = {
      userName: 'a',
      userType: 'b',
      roomName: 'c'
    };

    tokenManager.generateToken(info, token => {
      let pieces = token.split('.');

      let encodedPayload = pieces[0];
      let signature = pieces[1];

      let payload = JSON.parse(new Buffer(encodedPayload, 'base64').toString('utf8'));
      payload.someProperty = 'someValue';

      let newEncodedPayload = new Buffer(JSON.stringify(payload), 'utf8').toString('base64');
      let newToken = newEncodedPayload + '.' + signature;

      tokenManager.decryptToken(newToken, decrypted => {
        expect(decrypted).to.equal(null);
        done();
      });
    });
  });

  it('should return null from a malformed token', done => {
    let info = {
      userName: 'a',
      userType: 'b',
      roomName: 'c'
    };

    tokenManager.generateToken(info, token => {
      let pieces = token.split('.');

      let encodedPayload = pieces[0];
      let signature = pieces[1];

      let payload = JSON.parse(new Buffer(encodedPayload, 'base64').toString('utf8'));
      payload.someProperty = 'someValue';

      let newEncodedPayload = new Buffer(JSON.stringify(payload).substring(0,3), 'utf8').toString('base64');
      let newToken = newEncodedPayload + '.' + signature;

      tokenManager.decryptToken(newToken, decrypted => {
        expect(decrypted).to.equal(null);
        done();
      });
    });
  });
});
