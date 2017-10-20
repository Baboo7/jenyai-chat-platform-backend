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

  describe('deleteFromRAM', () => {
    it('should do nothing', () => {
      let sockets = {
        'test1': {
          student: { },
          teacher: { }
        }
      };

      let expected = {
        'test1': {
          student: { },
          teacher: { }
        }
      };

      roomManager.deleteFromRAM(sockets, 'test2');
      expect(sockets).to.deep.equal(expected);
    });

    it('should delete a room from the sockets object', () => {
      let sockets = {
        'test': {
          student: { },
          teacher: { }
        }
      };

      roomManager.deleteFromRAM(sockets, 'test');
      expect(sockets['test']).to.equal(undefined);
    });
  });
});
