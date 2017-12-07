let router = require('express').Router();

const getAll = require('./getAll');
const deleteConversations = require('./delete');

router.get('/', getAll);

router.get('/delete', deleteConversations);

module.exports = router;
