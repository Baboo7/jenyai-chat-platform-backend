/*  Returns the client associated to the given id.
    params:
      sockets (object)
      id (number)
    return: the client object or null if not found
*/
const getClient = (sockets, id) => {
  let client = null;
  if (sockets.students[id] !== undefined) {
    client = sockets.students[id];
  } else if (sockets.teachers[id] !== undefined) {
    client = sockets.teachers[id];
  } else {
    console.error(`no client found for id ${id}`);
  }

  return client;
};

module.exports = { getClient };
