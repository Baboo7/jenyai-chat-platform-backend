'use strict';
let roomManager = require('../../../websocket/managers/room');
let expect = require('chai').expect;

describe('roomManager', () => {
  describe('countStudents', () => {
    it('should count the students in a room', () => {
      let sockets = {
        0: { type: 'teacher', room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        2: { type: 'teacher', room: 'test', socket: { id: 2 } },
        1: { type: 'teacher', room: 'test', socket: { id: 1 } },
      };

      expect(roomManager.countStudents(sockets, 'test')).to.equal(1);
    });
  });

  describe('countTeachers', () => {
    it('should count the teachers in a room', () => {
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        2: { type: 'teacher', load: 5, room: 'test', socket: { id: 2 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };

      expect(roomManager.countTeachers(sockets, 'test')).to.equal(3);
    });
  });

  describe('getTeachers', () => {
    it('should get the list of the teachers in the specified room', () => {
      let sockets = {
        0: { type: 'teacher', room: 'roomA' },
        2: { type: 'teacher', room: 'roomA' },
        1: { type: 'teacher', room: 'roomB' },
        3: { type: 'student', room: 'roomA' },
        4: { type: 'student', room: 'roomA' },
        5: { type: 'student', room: 'roomB' },
        6: { type: 'student', room: 'roomC' }
      };
      let room = 'roomA';

      let expected = [
        { type: 'teacher', room: 'roomA' },
        { type: 'teacher', room: 'roomA' }
      ];

      expect(roomManager.getTeachers(sockets, room)).to.deep.equal(expected);
    });
  });

  describe('getTeacherClassroom', () => {
    it('should get the list of students associated to the specified teacher', () => {
      let teacher = { type: 'teacher', room: 'roomA', socket: { id: 0 } };
      let sockets = {
        0: { type: 'teacher', room: 'roomA', socket: { id: 0 } },
        1: { type: 'teacher', room: 'roomA', socket: { id: 1 } },
        2: { type: 'teacher', room: 'roomB', socket: { id: 2 } },
        3: { type: 'student', room: 'roomA', socket: { id: 3 }, recipient: 0 },
        4: { type: 'student', room: 'roomA', socket: { id: 4 }, recipient: 1 },
        5: { type: 'student', room: 'roomB', socket: { id: 5 }, recipient: 2 },
        6: { type: 'student', room: 'roomA', socket: { id: 6 }, recipient: 0 }
      };
      let room = 'roomA';

      let expected = [
        { type: 'student', room: 'roomA', socket: { id: 3 }, recipient: 0 },
        { type: 'student', room: 'roomA', socket: { id: 6 }, recipient: 0 }
      ];

      expect(roomManager.getTeacherClassroom(sockets, teacher)).to.deep.equal(expected);
    });
  });
});
