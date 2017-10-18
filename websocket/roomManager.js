'use strict';
const roomsCtrl = require('../database/controllers/rooms');

/*  Creates a new room in the sockets object.

    PARAMS
      sockets (object)
      name (string): name of the room
      password (string): password of the room

    RETURN
      none
*/
const create = (sockets, name, password) => {
  sockets[name] = {
    password,
    student: { },
    teacher: { }
  }
};

/*  Retrieves a room from the database.

    PARAMS
      name (string): name of the room
      callback (function)

    RETURN
      none
*/
const doesExist = (name, callback) => {
  roomsCtrl.find(name, room => {
    callback(room);
  });
};

module.exports = {
  create,
  doesExist
};
