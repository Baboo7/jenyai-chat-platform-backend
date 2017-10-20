let router = require('express').Router();

const connectStudent = require('./connectStudent');
const connectTeacher = require('./connectTeacher');
const create = require('./create');
const deleteRoom = require('./delete');
const getRoom = require('./get');
const getAll = require('./getAll');

router.post('/connect/student', connectStudent);
router.post('/connect/teacher', connectTeacher);
router.post('/create', create);
router.post('/delete', deleteRoom);
router.get('/get/:name', getRoom);
router.get('/get', getAll);

module.exports = router;
