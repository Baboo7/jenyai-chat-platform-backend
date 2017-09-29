/* Structure of the sockets object: sockets[roomId][emitterType][userId]
  Contains
    name (string): name of the person connected
    socket (object): connection socket
    recipient (uuid): id of the recipient
    timestamp (date): for student - timestamp of the last message received
*/
let sockets = { };

module.exports = sockets;
