const isEmpty = str => {
  if (!str || str.length === 0 || !/\S+/.test(str)) {
    return true;
  }
  return false;
};

const parser = (data, user, emitter) => {
  if (!data || isEmpty(data.payload)) {
    return null;
  }

  let metamsg = {
    emitter: user.userId,
    emitterType: user.type,
    recipient: emitter.recipient,
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
