# Back Ann

Backend of the chat platform in NodeJs. The app is deployed on Heroku.

## Development server

Run `node server.js` for a dev server. Navigate to `http://localhost:8080/` using postman for example to access the API (described below). Use `nodemon` instead of `node` if you want the app to automatically reload when you change any of the source files.

## Folder architecture

- `database`: contains all the database configs (`/config`), models (`/models`), controllers (`/controllers`) and migrations schemas (`/migrations`). The ORM used is [sequelize](http://docs.sequelizejs.com/) with PostgreSQL.

- `routes`: contains all the functions executed for each route of the API (described below).

- `websocket`: contains all the events (`/events`) handled by the websocket server. It also contains the `sockets` object that stores all the running chat rooms with the connected clients.

## Database

#### PostgreSQL

The DBMS used is PostgreSQL. To connect to local database run `sudo -u <username> psql <database>`. The `<database>` parameter is optional.

Useful commands:

- `\l`: list databases

- `\dt`: list tables

- `\q`: quit psql

#### Sequelize

The ORM used is [sequelize](http://docs.sequelizejs.com/). It is helpful for database migration, seeding and requesting. Run `./prepare.sh` to create the database `jenyai` defined in `database/config/config.json` and the tables defined by the models.

- `sequelize model:generate --name <model_name> --attributes <atttr1>:<type1>,<atttr2>:<type2>`: generates a new model with the associated migration. It automatically creates `id`, `createdAt` and `updatedAt` fields.

- `sequelize seed:generate --name <seed_name>`: generates a new seeder.

#### Tables

- conversations: stores all the conversations

- rooms: stores all the available chat rooms

## Websocket

#### Received events

- `connect-student` (teacher): connects a teacher to a student.

> **id**: uuid - id of the student to connect to

- `disconnect`: ends a connection.

- `init`: initializes a connection.

> **emitterType**: string - either 'student' or 'teacher'

> **name**: string - name of the emitter

> **roomId**: string - name of the room to connect to

- `message`: transmits a message.

Only text messages at the moment.

> **payload**: string - text message to transmit

#### Emitted events

- `connect-student` (teacher): connects a teacher to a student.

> **id**: uuid - id of the student to connect to

- `del-student` (teacher): remove a student from teacher view.

> **student**: uuid - id of the student to remove

- `init`: initializes a connection.

> **id**: uuid - id of the connected entity

- `new-student` (teacher): connects a teacher to a student.

> **student**: object - contains ↓↓↓

>> **id**: uuid - id of the student

>> **name**: string - name of the student

> **messages**: array - contains all the messages of the conversation

- `message`: sends a message.

> **message**: object - message to send ↓↓↓

>> **emitter**: uuid - id of the emitter

>> **emitterType**: string - either 'student' or 'teacher'

>> **recipient**: uuid - id of the recipient

>> **timestamp**: timestamp - date when the message was issued

>> **message**: object - contains the message ↓↓↓

>>> **type**: string - type of the message ('text', 'video'...)

>>> **payload**: object - contains all the required data associated to the message type

- `typing-off`: indicates that the emitter has cleared h.is.er input.

> **emitter**: uuid - id of the emitter

- `typing-on`: indicates that the emitter is typing a message.

> **emitter**: uuid - id of the emitter

## API

#### Chat rooms management

- `/classroom` (post): creates a new chat room.

> Required body params:

>> **id**: string (see config file for length) - id of the chat room

>> **password**: string (see config file for length) - password of the chat room


- `/classroom/:id` (get): check if a room exists for `id`.

> Required url params:

>> **id**: string - id to test

>> **password**: string (see config file for length) - id of the chat room


- `/classroom/:id` (post): check if a room exists for `id` and `password`.

> Required url params:

>> **id**: string - id to test

> Required body params:

>> **password**: string - password to test


- `/classroom/:id` (delete): delete the room `id`.

> Required url params:

>> **id**: string (see config file for length) - id of the room

## Unit tests

Run the test with the command `npm test`. All tests files are stored in the `test` folder.

## Heroku apps

- staging: https://staging-jenyai.herokuapp.com

- production: https://prod-jenyai.herokuapp.com
