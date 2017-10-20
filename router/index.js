let router = require('express').Router();

const conversationsRtr = require('./conversations');
const roomsRtr = require('./rooms');

router.use('/conversations', conversationsRtr);
router.use('/rooms', roomsRtr);

module.exports = router;
