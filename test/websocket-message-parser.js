'use strict';
let expect = require('chai').expect;
let parser = require('../websocket/message-parser');

describe('websocket/message-parser', () => {

  it('parser > should return null from undefined data', () => {
    let data = undefined;
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('parser > should return null from missing data', () => {
    let data = { };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('parser > should return null from empty payload', () => {
    let data = { payload: '' };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('parser > should return null from blank payload', () => {
    let data = { payload: '    ' };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = parser(data, user, emitter);

    let expected = null;

    expect(toTest).to.deep.equal(expected);
  });

  it('parser > should return a text message object', () => {
    let data = { payload: 'some text' };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = parser(data, user, emitter);

    let expected = {
      emitter: user.userId,
      emitterType: user.type,
      recipient: emitter.recipient,
      timestamp: toTest.timestamp,
      message: {
        type: 'text',
        payload: data.payload
      }
    };

    expect(toTest).to.deep.equal(expected);
  });

  it('parser > should return a video vimeo message object', () => {
    let id = '227718208';
    let data = { payload: `https://vimeo.com/${id}` };
    let user = { userId: 1, roomId: 'AAAAAA', type: 'teacher' };
    let emitter = { recipient: 2 };

    let toTest = parser(data, user, emitter);

    let expected = {
      emitter: user.userId,
      emitterType: user.type,
      recipient: emitter.recipient,
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
