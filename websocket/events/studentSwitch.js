const userManager = require('../managers/user');
let sockets = require('../sockets');

/*  Switch the interlocutor of a student.

    PARAMS
      data (object): object sent by the client. It must contain
        id (string): id of the student to switch
      socketId (string): socket id

    RETURN
      none
*/
const studentSwitch = (data, socketId) => {

  // Retrieve the emitter of the event
  let user = userManager.getEmitter(sockets, socketId);
  if (user === null) { return; }

  // Only teachers can emit this event
  if (!userManager.isTeacher(user)) { return; }

  // Get the student to switch
  let studentId = data.id;
  let student = userManager.getEmitter(sockets, studentId);
  if (student === null) { return; }

  // Check that the student is associated to the teacher firing the event
  if (student.recipient && student.recipient !== user.socket.id) { return; }

  // Set the new student's interlocutor
  student.discussWithAgent = !student.discussWithAgent;

  let msg = {
    id: studentId,
    name: student.name,
    discussWithAgent: student.discussWithAgent
  };

  user.socket.emit('student-updated', msg);
};

module.exports = studentSwitch;
