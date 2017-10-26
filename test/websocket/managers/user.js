'use strict';
let userManager = require('../../../websocket/managers/user');
let expect = require('chai').expect;

describe('UserManager', () => {

  describe('getEmitter', () => {
    it('getEmitter > should return the right emitter', () => {
      let expected = { type: 'teacher', load: 5, room: 'test', socket: { id: 2 } };
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };
      sockets[expected.id] = expected;

      expect(userManager.getEmitter(sockets, expected.id)).to.equal(expected);
    });

    it('getEmitter > should return null', () => {
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };

      expect(userManager.getEmitter(sockets, 2)).to.equal(null);
    });
  });

  describe('deleteEmitter', () => {
    it('should delete the specified emitter', () => {
      let expected = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };

      userManager.deleteEmitter(sockets, 3);

      expect(sockets).to.deep.equal(expected);
    });
  });

  it('getUnderloadedTeacherId > should return the if of the most underloaded teacher', () => {
    let sockets = {
      0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
      3: { type: 'student', room: 'test', socket: { id: 3 } },
      2: { type: 'teacher', load: 5, room: 'test', socket: { id: 2 } },
      1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
    };

    expect(userManager.getUnderloadedTeacherId(sockets, 'test')).to.equal(2);
  });

  it('getUnderloadedTeacherId > should return null', () => {
    let sockets = { 3: { type: 'student', room: 'test', socket: { id: 3 } } };

    expect(userManager.getUnderloadedTeacherId(sockets, 'test')).to.equal(null);
  });
});
