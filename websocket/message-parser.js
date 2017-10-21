/*  Indicates if a string is empty or only contains space chars.

    PARAMS
      str (string): string to check

    RETURN
      (boolean): true if empty, false otherwise
*/
const isEmpty = str => {
  if (!str || str.length === 0 || !/\S+/.test(str)) {
    return true;
  }
  return false;
};

/*  Parses a message.

    PARAMS
      data (object): message data
      user (object): user information

    RETURN
      (object): parsed message or null if invalid
*/
const parser = (data, user) => {
  if (!data || isEmpty(data.payload)) { return null; }

  let metamsg = {
    emitter: user.socket.id,
    emitterType: user.type,
    recipient: user.recipient,
    timestamp: new Date(),
  };

  let msg = {}
  if ((/https:\/\/vimeo.com\/[0-9]+/g).test(data.payload)) {
    msg.type = 'video';
    msg.payload = {
      platform: 'vimeo',
      id: data.payload.substring(data.payload.lastIndexOf('/') + 1)
    };
  } else {
    msg.type = 'text';
    msg.payload = data.payload;
  }

  metamsg.message = msg;
  return metamsg;
};

module.exports = parser;
