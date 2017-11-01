/* Structure of the sockets object: sockets[socketId]. Contains
    name (string): name of the person connected
    type (string): either 'student' or 'teacher'
    room (string): name of the room
    socket (object): socket object
    recipient (string): recipient's id
    timestamp (date): timestamp of the last message received

    ---- students ----
    discussWithAgent (boolean): whether the student discuss with the agent

    ---- teachers ----
    load (number): number of handled students
*/
let sockets = { };

module.exports = sockets;
