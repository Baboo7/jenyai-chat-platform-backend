# Back Ann

Backend of the chat platform in NodeJs. The app is deployed on Heroku.

## Development server

Run `node server.js` for a dev server. Navigate to `http://localhost:8080/` using postman for example to access the API (described below). Use `nodemon` instead of `node` if you want the app to automatically reload when you change any of the source files.

## Folder architecture

- `database`: contains all the database configs (`/config`), models (`/models`), controllers (`/controllers`) and migrations schemas (`/migrations`). The ORM used is [sequelize](http://docs.sequelizejs.com/) with PostgreSQL.

- `routes`: contains all the functions executed for each route of the API (described below).

- `websocket`: contains all the events (`/events`) handled by the websocket server. It also contains the `sockets` object that stores all the running chat rooms with the connected clients.

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

## Heroku apps

- staging: https://staging-nellyana.herokuapp.com

- production: https://prod-nellyana.herokuapp.com
