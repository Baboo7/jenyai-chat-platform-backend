'use strict';

let expect = require('chai').expect;
let messageParser = require('../../../messenger/parser/utils');

describe('Messenger utils parser', () => {

  // isEmpty
  describe('isEmpty', () => {
    it('should detect an undefined string', () => {
      let str = undefined;

      let expected = true;

      expect(messageParser.isEmpty(str)).to.equal(expected);
    });

    it('should detect an empty string', () => {
      let str = '';

      let expected = true;

      expect(messageParser.isEmpty(str)).to.equal(expected);
    });

    it('should detect a blank string', () => {
      let str = '                ';

      let expected = true;

      expect(messageParser.isEmpty(str)).to.equal(expected);
    });

    it('should detect a non empty string', () => {
      let str = 'not empty';

      let expected = false;

      expect(messageParser.isEmpty(str)).to.equal(expected);
    });
  });

  // isVimeoVideo
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

  // isYoutubeVideo
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

  // parseText
  describe('parseText', () => {
    it('should return a text message', () => {
      let text = 'user input';

      let expected = {
        type: 'text',
        text: text
      };

      expect(messageParser.parseText(text)).to.deep.equal(expected);
    });

    it('should return a video message', () => {
      let text = 'https://www.youtube.com/embed/121212';

      let expected = {
        type: 'video',
        url: 'https://www.youtube.com/embed/121212?'
      };

      expect(messageParser.parseText(text)).to.deep.equal(expected);
    });
  });

});
