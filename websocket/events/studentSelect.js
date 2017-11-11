const userManager = require('../managers/user');
let sockets = require('../sockets');

/*  Establishes the connection from a teacher to a student.

    PARAMS
      data (object): object sent by the client. It must contain
        id (string): id of the student to connect to
      socketId (string): socket id

    RETURN
      none
*/
const studentSelect = (data, socketId) => {
  let user = userManager.getEmitter(sockets, socketId);
  if (user === null) { return; }

  // Only teachers can emit this event
  if (!userManager.isTeacher(user)) { return; }

  // Get the student to connect to
  let studentId = data.id;
  let student = userManager.getEmitter(sockets, studentId);
  if (student === null) { return; }

  // Check that the student is associated to the teacher firing the event
  if (student.recipient && student.recipient !== user.socket.id) { return; }

  // Set the student as the new recipient
  user.recipient = studentId;

  let msg = { id: studentId };

  user.socket.emit('student-selected', msg);
};

module.exports = studentSelect;
