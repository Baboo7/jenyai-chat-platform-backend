'use strict';
let userManager = require('../../../websocket/managers/user');
let expect = require('chai').expect;

describe('UserManager', () => {

  describe('getEmitter', () => {
    it('should return the right emitter', () => {
      let expected = { type: 'teacher', load: 5, room: 'test', socket: { id: 2 } };
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        3: { type: 'student', room: 'test', socket: { id: 3 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
      };
      sockets[expected.id] = expected;

      expect(userManager.getEmitter(sockets, expected.id)).to.equal(expected);
    });

    it('should return null', () => {
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

  describe('getStudentFromOverloadedTeacher', () => {
    it('should return undefined', () => {
      let sockets = {
        0: { type: 'teacher', room: 'A', socket: { id: 0 }, load: 15 },
        1: { type: 'teacher', room: 'A', socket: { id: 1 }, load: 10 },
        2: { type: 'teacher', room: 'A', socket: { id: 2 }, load: 20 },
        3: { type: 'teacher', room: 'B', socket: { id: 3 }, load: 30 },

        4: { type: 'student', room: 'A', socket: { id: 4 } },
        5: { type: 'student', room: 'A', socket: { id: 5 } },
        6: { type: 'student', room: 'B', socket: { id: 6 } },
        7: { type: 'student', room: 'B', socket: { id: 7 } }
      };

      let expected = undefined;

      expect(userManager.getStudentFromOverloadedTeacher(sockets, undefined)).to.equal(expected);
    });

    it('should return a student', () => {
      let sockets = {
        0: { type: 'teacher', room: 'A', socket: { id: 0 }, recipient: 0, load: 0 },
        1: { type: 'teacher', room: 'A', socket: { id: 1 }, recipient: 0, load: 0 },
        2: { type: 'teacher', room: 'A', socket: { id: 2 }, recipient: 4, load: 2 },
        3: { type: 'teacher', room: 'B', socket: { id: 3 }, recipient: 0, load: 2 },

        4: { type: 'student', room: 'A', socket: { id: 4 }, recipient: 2 },
        5: { type: 'student', room: 'A', socket: { id: 5 }, recipient: 2 },
        6: { type: 'student', room: 'B', socket: { id: 6 }, recipient: 3 },
        7: { type: 'student', room: 'B', socket: { id: 7 }, recipient: 3 }
      };

      let expected = { type: 'student', room: 'A', socket: { id: 5 }, recipient: 2 };

      expect(userManager.getStudentFromOverloadedTeacher(sockets, 'A')).to.deep.equal(expected);
    });
  });

  describe('getOverloadedTeacherId', () => {
    it('should get the id of the most overloaded teacher', () => {
      let sockets = {
        0: { type: 'teacher', load: 15, room: 'test', socket: { id: 0 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
        3: { type: 'teacher', load: 20, room: 'test', socket: { id: 3 } },
      };

      expect(userManager.getOverloadedTeacherId(sockets, 'test')).to.equal(3);
    });

    it('should get the id of the first most overloaded teacher', () => {
      let sockets = {
        0: { type: 'teacher', load: 20, room: 'test', socket: { id: 0 } },
        1: { type: 'teacher', load: 10, room: 'test', socket: { id: 1 } },
        3: { type: 'teacher', load: 20, room: 'test', socket: { id: 3 } },
      };

      expect(userManager.getOverloadedTeacherId(sockets, 'test')).to.equal(0);
    });
  });

  describe('createAgent', () => {
    it('should create a user agent', () => {
      let room = 'room';
      let recipient = 'recipient';

      let expected = {
        name: 'JenyAI',
        type: 'agent',
        room: room,
        recipient: recipient
      };

      expect(userManager.createAgent(room, recipient)).to.deep.equal(expected);
    });
  });

  describe('isAgent', () => {
    it('should detect a user agent', () => {
      let user = {
        type: 'agent'
      };

      let expected = true;

      expect(userManager.isAgent(user)).to.equal(expected);
    });

    it('should not detect a user agent', () => {
      let user = {
        type: 'not an agent'
      };

      let expected = false;

      expect(userManager.isAgent(user)).to.equal(expected);
    });

    it('should not detect a user agent 2', () => {
      let user = undefined;

      let expected = false;

      expect(userManager.isAgent(user)).to.equal(expected);
    });
  });

  describe('isHuman', () => {
    it('should detect a user human', () => {
      let user = {
        type: 'student'
      };

      let expected = true;

      expect(userManager.isHuman(user)).to.equal(expected);
    });

    it('should not detect a user human', () => {
      let user = {
        type: 'not a human'
      };

      let expected = false;

      expect(userManager.isHuman(user)).to.equal(expected);
    });

    it('should not detect a user human 2', () => {
      let user = undefined;

      let expected = false;

      expect(userManager.isHuman(user)).to.equal(expected);
    });
  });

  describe('isInRoom', () => {
    it('should say the user is in the specified room', () => {
      let room = 'room';
      let user = { room: 'room' };

      let expected = true;

      expect(userManager.isInRoom(user, room)).to.equal(expected);
    });

    it('should say the user is not in the specified room', () => {
      let room = 'roomA';
      let user = { room: 'roomB' };

      let expected = false;

      expect(userManager.isInRoom(user, room)).to.equal(expected);
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
