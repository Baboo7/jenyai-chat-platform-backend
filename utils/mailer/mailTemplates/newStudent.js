/*  Creates mail content based on input data.

    PARAMS
      data (object): contains the information to create the mail content
        studentName (string): name of the student
        roomName (string): name of the room

    RETURN
      (object)
        subject (string): subject of the mail
        text (string): text of the mail
*/
const newStudent = (data) => {
  return {
    subject: `${data.studentName} needs your help!`,
    text: `${data.studentName} connected to the room ${data.roomName} where no teacher is present. Are you available for some help?\nThanks! :)\n\nJenyAI`
  }
};

module.exports = newStudent;
