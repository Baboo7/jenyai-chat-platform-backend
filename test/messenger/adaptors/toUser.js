'use strict';
let expect = require('chai').expect;
let adaptor = require('../../../messenger/adaptors').toUser;

describe('Messenger toUser adaptor', () => {

  it('should return a valid object', () => {
    // Params

    let id = '1';
    let type = 'text';
    let text = 'what is meaning of life?';

    // Test

    let message = {
      emitter: id,
      message: {
        type: type,
        text: text
      }
    };

    let user = {
      socket: {
        id: id
      }
    };

    let expected = {
      align: 'right',
      emitter: id,
      type: type,
      text: text
    };

    expect(adaptor(message, user)).to.deep.equal(expected);
  });
});
