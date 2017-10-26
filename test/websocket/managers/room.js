'use strict';
let roomManager = require('../../../websocket/managers/room');
let expect = require('chai').expect;

describe('roomManager', () => {
  describe('countTeachers', () => {
    it('should return the number of connected teachers', () => {
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        2: { type: 'teacher', load: 5, room: 'test', socket: { id: 2 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };

      expect(roomManager.countTeachers(sockets, 'test')).to.equal(3);
    });
  });
});
