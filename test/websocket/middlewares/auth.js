'use strict';
let tokenManager = require('../../../utils/tokenManager');
let authMW = require('../../../websocket/middlewares/auth');
let expect = require('chai').expect;

describe('authMW', () => {
  it('should validate authentication', done => {
    let user = {
      roomId: 'a',
      type: 'b',
      id: 'c'
    };

    tokenManager.generateToken(user, token => {
      authMW(token, decryptedUser => {
        expect(decryptedUser).to.include(user);
        done();
      });
    });
  });

  it('should not validate authentication', done => {
    let token = 'token';

    authMW(token, undefined, () => {
      expect(1).to.equal(1);
      done();
    });
  });
});
