'use strict';
let expect = require('chai').expect;
let messageParser = require('../../../messenger/parser/platform');

describe('Messenger platform parser', () => {

  describe('isVimeoVideo', () => {
    it('should detect a valid url video', () => {
      let url = 'https://www.vimeo.com/227718208';

      expect(messageParser.isVimeoVideo(url)).to.equal(true);
    });

    it('should detect a valid url video', () => {
      let url = 'https://vimeo.com/channels/staffpicks/239756014';

      expect(messageParser.isVimeoVideo(url)).to.equal(true);
    });
  });

  describe('isYoutubeVideo', () => {
    it('should detect a valid url video', () => {
      let url = 'https://www.youtube.com/watch?v=UDmTxza0I6o';

      expect(messageParser.isYoutubeVideo(url)).to.equal(true);
    });

    it('should detect a valid url video', () => {
      let url = 'https://www.youtube.com/embed/-ZWGpOSS6T0?start=10&end=20';

      expect(messageParser.isYoutubeVideo(url)).to.equal(true);
    });
  });

  // extractVimeoVideoParameters
  describe('extractVimeoVideoParameters', () => {
    it('should return the id of the video', () => {
      let id = '227718208';
      let url = `https://www.vimeo.com/${id}`;
      let expected = {
        id: id
      };

      expect(messageParser.extractVimeoVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the id of the video', () => {
      let id = '239756014';
      let url = `https://vimeo.com/channels/staffpicks/${id}`;
      let expected = {
        id: id
      };

      expect(messageParser.extractVimeoVideoParameters(url)).to.deep.equal(expected);
    });
  });

  // extractYoutubeVideoParameters
  describe('extractYoutubeVideoParameters', () => {
    it('should return the right params from watch url', () => {
      let id = 'UDmTxza0I6o';
      let url = `https://www.youtube.com/watch?v=${id}`;
      let expected = {
        id: id,
        start: null,
        end: null
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from watch url w/ start & end params', () => {
      let id = 'UDmTxza0I6o';
      let start = '10';
      let end = '20';
      let url = `https://www.youtube.com/watch?v=${id}&start=${start}&end=${end}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from watch url w/ inverted start & end params', () => {
      let id = 'UDmTxza0I6o';
      let start = '10';
      let end = '20';
      let url = `https://www.youtube.com/watch?v=${id}&end=${end}&start=${start}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from watch url w/ start param', () => {
      let id = 'UDmTxza0I6o';
      let start = '10';
      let end = null;
      let url = `https://www.youtube.com/watch?v=${id}&start=${start}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from watch url w/ end param', () => {
      let id = 'UDmTxza0I6o';
      let start = null;
      let end = '10';
      let url = `https://www.youtube.com/watch?v=${id}&end=${end}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from embed url', () => {
      let id = '-ZWGpOSS6T0';
      let start = null;
      let end = null;
      let url = `https://www.youtube.com/embed/${id}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from embed url w/ start & end params', () => {
      let id = '-ZWGpOSS6T0';
      let start = '10';
      let end = '20';
      let url = `https://www.youtube.com/embed/${id}?start=${start}&end=${end}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from embed url w/ inverted start & end params', () => {
      let id = '-ZWGpOSS6T0';
      let start = '10';
      let end = '20';
      let url = `https://www.youtube.com/embed/${id}?end=${end}&start=${start}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from embed url w/ start param', () => {
      let id = '-ZWGpOSS6T0';
      let start = '10';
      let end = null;
      let url = `https://www.youtube.com/embed/${id}?start=${start}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });

    it('should return the right params from embed url w/ end param', () => {
      let id = '-ZWGpOSS6T0';
      let start = null;
      let end = '20';
      let url = `https://www.youtube.com/embed/${id}?end=${end}`;
      let expected = {
        id: id,
        start: start,
        end: end
      };

      expect(messageParser.extractYoutubeVideoParameters(url)).to.deep.equal(expected);
    });
  });

  // parser
  describe('parser', () => {
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
      let data = { payload: '' };
      let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
      let emitter = { recipient: 2 };

      let toTest = messageParser.parser(data, user, emitter);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return null from blank payload', () => {
      let data = { payload: '    ' };
      let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
      let emitter = { recipient: 2 };

      let toTest = messageParser.parser(data, user, emitter);

      let expected = null;

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a text message object', () => {
      let data = { payload: 'some text' };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'text',
          text: data.payload
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video vimeo message object', () => {
      let id = '227718208';
      let data = { payload: `https://vimeo.com/${id}` };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://player.vimeo.com/video/${id}`
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video vimeo message object 2', () => {
      let id = '239756014';
      let data = { payload: `https://vimeo.com/channels/staffpicks/${id}` };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://player.vimeo.com/video/${id}`
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video youtube message object', () => {
      let id = 'UDmTxza0I6o';
      let start = null;
      let end = null;
      let data = { payload: `https://www.youtube.com/watch?v=${id}` };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://www.youtube.com/embed/${id}?`
        }
      };

      expect(toTest).to.deep.equal(expected);
    });

    it('should return a video youtube message object 2', () => {
      let id = '-ZWGpOSS6T0';
      let start = '10';
      let end = '20';
      let data = { payload: `https://www.youtube.com/embed/${id}?start=${start}&end=${end}` };
      let user = { room: 'AAAAAA', type: 'teacher', recipient: 2, socket: { id: 1 } };

      let toTest = messageParser.parser(data, user);

      let expected = {
        emitter: user.socket.id,
        emitterType: user.type,
        recipient: user.recipient,
        timestamp: toTest.timestamp,
        message: {
          type: 'video',
          url: `https://www.youtube.com/embed/${id}?&start=${start}&end=${end}`
        }
      };

      expect(toTest).to.deep.equal(expected);
    });
  });
});
