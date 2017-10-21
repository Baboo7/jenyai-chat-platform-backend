'use strict';
const roomsCtrl = require('../../database/controllers/rooms');
const userManager = require('./user');

/*  Returns the number of connected teachers in a room.

    PARAMS
      sockets (object)
      room (string): name of the room

    RETURN
      (number): the number of connected teachers in the room
*/
const countTeachers = (sockets, room) => {
  let counter = 0;
  Object.keys(sockets).forEach(socketId => {
    let user = sockets[socketId];
    if (userManager.isTeacher(user) && user.room === room) {
      counter++;
    }
  });
  return counter;
};

/*  Retrieves a room from the database.

    PARAMS
      name (string): name of the room
      callback (function): called once the room is retrieved. Can take 1 argument:
        room (object): room retrieved from the database. Null if not found

    RETURN
      none
*/
const doesExistInDb = (name, callback) => {
  roomsCtrl.find(name, room => {
    callback(room);
  });
};

module.exports = {
  countTeachers,
  doesExistInDb
};
