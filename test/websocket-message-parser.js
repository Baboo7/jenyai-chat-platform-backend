'use strict';
let expect = require('chai').expect;
let parser = require('../websocket/message-parser');

describe('MessageParser', () => {

  describe('parser', () => {
    it('should return null from undefined data', () => {
      let data = undefined;
      let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
      let emitter = { recipient: 2 };

      let toTest = parser(data, user, emitter);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return null from missing data', () => {
      let data = { };
      let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
      let emitter = { recipient: 2 };

      let toTest = parser(data, user, emitter);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return null from empty payload', () => {
      let data = { payload: '' };
      let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
      let emitter = { recipient: 2 };

      let toTest = parser(data, user, emitter);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return null from blank payload', () => {
      let data = { payload: '    ' };
      let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
      let emitter = { recipient: 2 };

      let toTest = parser(data, user, emitter);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a text message object', () => {
      let data = { payload: 'some text' };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'text',
          payload: data.payload
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video vimeo message object', () => {
      let id = '227718208';
      let data = { payload: `https://vimeo.com/${id}` };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          payload: {
            platform: 'vimeo',
            id
          }
        }
      };

      expect(toTest).to.deep.equal(expected);
    });
  });
});
