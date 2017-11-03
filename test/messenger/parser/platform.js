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
