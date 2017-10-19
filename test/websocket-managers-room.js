'use strict';
let roomManager = require('../websocket/managers/room');
let expect = require('chai').expect;

describe('websocket/managers/room', () => {
  it('countTeachers > should return the number of connected teachers', () => {
    let sockets = {
      'test': {
        teacher: {
          0: { test: '' },
          1: { test: '' },
          2: { test: '' },
        }
      }
    };

    expect(roomManager.countTeachers(sockets, 'test')).to.equal(3);
  });
});
