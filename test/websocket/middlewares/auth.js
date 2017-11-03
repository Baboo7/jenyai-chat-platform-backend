'use strict';
let tokenManager = require('../../../utils/tokenManager');
let authMW = require('../../../websocket/middlewares/auth');
let expect = require('chai').expect;

describe('authMW', () => {
  it('should validate authentication', done => {
    let user = {
      userName: 'a',
      userType: 'b',
      roomName: 'c'
    };

    tokenManager.generateToken(user, token => {
      authMW(token, decrypted => {
        expect(decrypted).to.deep.equal(user);
        done();
      });
    });
  });

  it('should not validate authentication', done => {
    let token = 'token';

    authMW(token, decrypted => {
      expect(true).to.equal(false);
      done();
    },
    () => {
      expect(true).to.equal(true);
      done();
    });
  });
});
