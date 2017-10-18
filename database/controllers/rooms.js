'use strict';
const rooms = require('../models').rooms;

/*  Creates a new room.

    PARAMS
      name (string): name of the room
      password (string): password of the room
      teachers (array of string): emails of the teachers associated to the room
      callback (function)

    RETURN
      none
*/
const create = (name, password, teachers, callback) => {
  if (typeof callback === 'undefined') {
    callback = () => { };
  }
  return rooms
  .create({
    name,
    password,
    teachers: teachers.join(',')
  })
  .then(() => callback())
  .catch(err => console.error(err))
};

/*  Fetches a room by its name in the rooms database.

    PARAMS
      name (string): name of the room
      callback (function): function called in case of success

    RETURN
      none
*/
const find = (name, callback) => {
  return rooms
  .findOne({
    where: { name },
    raw: true
  })
  .then(data => callback(data))
  .catch(err => console.error(err))
};

/*  Fetches a room by its name and password in the rooms database.

    PARAMS
      name (string): name of the room
      password (string): password of the room
      callback (function): function called in case of success

    RETURN
      none
*/
const findPassword = (name, password, callback) => {
  return rooms
  .findOne({
    where: { name, password },
    raw: true
  })
  .then(data => callback(data))
  .catch(err => console.error(err))
};

/*  Deletes a room.

    PARAMS
      name (string): name of the room
      callback (function)

    RETURN
      none
*/
const deleteRoom = (name, callback) => {
  if (typeof callback === 'undefined') {
    callback = () => { };
  }
  return rooms
  .destroy({
    where: { name }
  })
  .then(() => callback())
  .catch(err => console.error(err))
};

module.exports = {
  create,
  delete: deleteRoom,
  find,
  findPassword
};
