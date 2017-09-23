let express = require('express');
let app = express();
let bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');
const setUpWebsocket = require('./websocket/websocket');

// configuration application =================

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.post('/classroom', routes.createClassroom);
app.get('/classroom/:id', routes.getClassroom);
app.delete('/classroom/:id', routes.deleteClassroom);

let server = app.listen(config.port);

// configuration websocket =================

setUpWebsocket(server);
console.log(`server listening on port ${config.port}`);
