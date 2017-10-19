'use strict';
let userManager = require('../websocket/managers/user');
let expect = require('chai').expect;

describe('websocket/managers/user', () => {

  it('getUnderloadedTeacherId > should return the if of the most underloaded teacher', () => {
    let sockets = {
      'test': {
        teacher: {
          0: {
            load: 15
          },
          1: {
            load: 20
          },
          2: {
            load: 10
          }
        }
      }
    };

    expect(userManager.getUnderloadedTeacherId(sockets, 'test')).to.equal('2');
  });

  it('getUnderloadedTeacherId > should return null', () => {
    let sockets = {
      'test': {
        teacher: { }
      }
    };

    expect(userManager.getUnderloadedTeacherId(sockets, 'test')).to.equal(null);
  });
});
