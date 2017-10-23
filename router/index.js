let router = require('express').Router();

const contactRtr = require('./contact');
const conversationsRtr = require('./conversations');
const roomsRtr = require('./rooms');

router.use('/contact', contactRtr);
router.use('/conversations', conversationsRtr);
router.use('/rooms', roomsRtr);

module.exports = router;
