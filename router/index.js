let router = require('express').Router();

const roomsRtr = require('./rooms');

router.use('/rooms', roomsRtr);

module.exports = router;
