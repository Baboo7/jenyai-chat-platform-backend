'use strict';

let roomManager = { };

module.exports = roomManager;

const roomsCtrl = require('../../database/controllers/rooms');
const userManager = require('./user');

/*  Balance the load over teachers in a classroom.

    PARAMS
      sockets (object)
      room (string): name of the room

    RETURN
      none
*/
roomManager.balanceLoad = (sockets, room) => {
  let averageLoad = parseInt(roomManager.countStudents(sockets, room) / roomManager.countTeachers(sockets, room));

  for (let i = 0 ; i < averageLoad ; i++) {
    let student = userManager.getStudentFromOverloadedTeacher(sockets, room);
    if (student) {
      userManager.disconnectStudent(sockets, student);
      userManager.connectToUnderloadedTeacher(sockets, student);
    }
  }
};

/*  Returns the number of connected students in a room.

    PARAMS
      sockets (object)
      room (string): name of the room

    RETURN
      (number): the number of connected students in the room
*/
roomManager.countStudents = (sockets, room) => {
  let counter = 0;
  Object.keys(sockets).forEach(socketId => {
    let user = sockets[socketId];
    if (userManager.isStudent(user) && userManager.isInRoom(user, room)) {
      counter++;
    }
  });
  return counter;
};

/*  Returns the number of connected teachers in a room.

    PARAMS
      sockets (object)
      room (string): name of the room

    RETURN
      (number): the number of connected teachers in the room
*/
roomManager.countTeachers = (sockets, room) => {
  let counter = 0;
  Object.keys(sockets).forEach(socketId => {
    let user = sockets[socketId];
    if (userManager.isTeacher(user) && user.room === room) {
      counter++;
    }
  });
  return counter;
};

/*  Returns the connected teachers in a room.

    PARAMS
      sockets (object)
      room (string): name of the room

    RETURN
      (array of object): the connected teachers in the room
*/
roomManager.getTeachers = (sockets, room) => {
  let teachersList = [ ];

  Object.keys(sockets).forEach(key => {
    let user = sockets[key];
    if (userManager.isTeacher(user) && userManager.isInRoom(user, room)) {
      teachersList.push(user);
    }
  });

  return teachersList;
};

/*  Returns the list of students connected to the specified teacher.

    PARAMS
      sockets (object)
      teacher (object)

    RETURN
      (array of object): list of students
*/
roomManager.getTeacherClassroom = (sockets, teacher) => {
  let studentsList = [ ];

  Object.keys(sockets).forEach(key => {
    let student = sockets[key];
    if (userManager.isStudent(student) && userManager.isInRoom(student, teacher.room) && student.recipient === teacher.socket.id) {
      studentsList.push(student);
    }
  });

  return studentsList;
};

/*  Retrieves a room from the database.

    PARAMS
      name (string): name of the room
      callback (function): called once the room is retrieved. Can take 1 argument:
        room (object): room retrieved from the database. Null if not found

    RETURN
      none
*/
roomManager.doesExistInDb = (name, callback) => {
  roomsCtrl.find(name, room => {
    callback(room);
  });
};
