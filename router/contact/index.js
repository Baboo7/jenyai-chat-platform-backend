let router = require('express').Router();

const getAll = require('./getAll');
const post = require('./post');

router.get('/', getAll);
router.post('/', post);

module.exports = router;
