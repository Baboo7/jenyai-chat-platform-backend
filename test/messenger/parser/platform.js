'use strict';

let expect = require('chai').expect;
let messageParser = require('../../../messenger/parser/platform');

// parser
describe('Messenger platform parser', () => {
  it('should return null from undefined data', () => {
    let data = undefined;
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = messageParser.parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('should return null from missing data', () => {
    let data = { };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = messageParser.parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('should return null from empty payload', () => {
    let data = {
      type: 'text',
      payload: {
        text: '',
        media: 'typed'
      }
    };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = messageParser.parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('should return null from blank payload', () => {
    let data = {
      type: 'text',
      payload: {
        text: '    ',
        media: 'typed'
      }
    };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = messageParser.parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  describe('text messages', () => {
    it('should return a text message object', () => {
      let data = {
        type: 'text',
        payload: {
          text: 'some text',
          media: 'typed'
        }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'text',
          text: data.payload.text,
          media: data.payload.media
        }
      };

      expect(toTest).to.deep.equal(expected);
    });
  });

  describe('video messages', () => {
    it('should return a video vimeo message object', () => {
      let id = '227718208';
      let data = {
        type: 'text',
        payload: {
          text: `https://vimeo.com/${id}`,
          media: 'typed'
        }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://player.vimeo.com/video/${id}`,
          media: data.payload.media
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video vimeo message object 2', () => {
      let id = '239756014';
      let data = {
        type: 'text',
        payload: {
          text: `https://vimeo.com/channels/staffpicks/${id}`,
          media: 'typed'
        }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://player.vimeo.com/video/${id}`,
          media: data.payload.media
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video youtube message object', () => {
      let id = 'UDmTxza0I6o';
      let start = null;
      let end = null;
      let data = {
        type: 'text',
        payload: {
          text: `https://www.youtube.com/watch?v=${id}`,
          media: 'typed'
        }
      };

      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://www.youtube.com/embed/${id}?`,
          media: data.payload.media
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video youtube message object 2', () => {
      let id = '-ZWGpOSS6T0';
      let start = '10';
      let end = '20';
      let data = {
        type: 'text',
        payload: {
          text: `https://www.youtube.com/embed/${id}?start=${start}&end=${end}`,
          media: 'typed'
        }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://www.youtube.com/embed/${id}?&start=${start}&end=${end}`,
          media: data.payload.media
        }
      };

      expect(toTest).to.deep.equal(expected);
    });
  });

  describe('event messages', () => {
    it('should return null from missing data', () => {

      let data = {
        type: 'event',
        payload: { }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return null from blank event', () => {

      let data = {
        type: 'event',
        payload: {
          event: '  '
        }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return an event message', () => {

      let data = {
        type: 'event',
        payload: {
          event: 'engage_conv'
        }
      };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: data.type,
          event: data.payload.event
        }
      };

      expect(toTest).to.deep.equal(expected);
    });
  });
});
