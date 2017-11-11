const studentSelect = require('./studentSelect');
const studentSwitch = require('./studentSwitch');
const disconnect = require('./disconnect');
const init = require('./init');
const message = require('./message');
const typingIndicatorHandler = require('./typingIndicatorHandler');

module.exports = {
  studentSelect: studentSelect,
  studentSwitch: studentSwitch,
  disconnect,
  init,
  message,
  typingIndicatorHandler
};
