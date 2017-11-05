'use strict';
let expect = require('chai').expect;
let adaptor = require('../../../messenger/adaptors/fromUserToUser');

describe('Messenger fromUserToUser adaptor', () => {

  it('should align left for student from teacher', () => {

    let emitterType = 'teacher';
    let receiverType = 'student';
    let align = 'left';

    let message = [{
      emitterType: emitterType,
      message: {
        type: 'text',
        text: 'what is meaning of life?'
      }
    }];

    let user = {
      type: receiverType
    };

    let expected = [{
      align: align,
      emitterType: emitterType,
      message: {
        type: 'text',
        text: 'what is meaning of life?'
      }
    }];

    expect(adaptor(message, user)).to.deep.equal(expected);
  });

  it('should align left for student from agent', () => {

    let emitterType = 'agent';
    let receiverType = 'student';
    let align = 'left';

    let message = [{
      emitterType: emitterType,
      message: {
        type: 'text',
        text: 'what is meaning of life?'
      }
    }];

    let user = {
      type: receiverType
    };

    let expected = [{
      align: align,
      emitterType: emitterType,
      message: {
        type: 'text',
        text: 'what is meaning of life?'
      }
    }];

    expect(adaptor(message, user)).to.deep.equal(expected);
  });

  it('should align right for teacher from agent', () => {

    let emitterType = 'agent';
    let receiverType = 'teacher';
    let align = 'right';

    let message = [{
      emitterType: emitterType,
      message: {
        type: 'text',
        text: 'what is meaning of life?'
      }
    }];

    let user = {
      type: receiverType
    };

    let expected = [{
      align: align,
      emitterType: emitterType,
      message: {
        type: 'text',
        text: 'what is meaning of life?'
      }
    }];

    expect(adaptor(message, user)).to.deep.equal(expected);
  });
});
