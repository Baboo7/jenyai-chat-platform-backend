/*  New waiter mail body template.

    PARAMS
      data (object): contains the information to create the mail content
        name (string): name of the waiter
        email (string): email of the waiter
        phone (string): phone of the waiter
        message (string): message of the waiter

    RETURN
      (object)
        subject (string): subject of the mail
        text (string): text of the mail
*/
const newStudent = (data) => {
  return {
    subject: `${data.name} just joined the waiting list!`,
    text: `${data.message}\n\n${data.name}\n\temail: ${data.email}\n\tphone: ${data.phone}`
  }
};

module.exports = newStudent;
