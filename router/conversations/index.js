let router = require('express').Router();

const getAll = require('./getAll');

router.get('/', getAll);

module.exports = router;
