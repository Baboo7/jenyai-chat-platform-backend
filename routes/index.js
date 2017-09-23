const createClassroom = require('./createClassroom');
const deleteClassroom = require('./deleteClassroom');
const getClassroom = require('./getClassroom');

const routes = {
  createClassroom,
  deleteClassroom,
  getClassroom
};

module.exports = routes;
