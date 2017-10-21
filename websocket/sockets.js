/* Structure of the sockets object: sockets[socketId]. Contains
    name (string): name of the person connected
    type (string): either 'student' or 'teacher'
    room (string): name of the room
    socket (object): socket object
    recipient (number): socket id of the recipient
    timestamp (date): timestamp of the last message received
    load (number): for teachers - number of handled students
*/
let sockets = { };

module.exports = sockets;
