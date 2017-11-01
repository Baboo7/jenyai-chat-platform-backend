let router = require('express').Router();

const connectStudent = require('./connectStudent');
const connectTeacher = require('./connectTeacher');
const create = require('./create');
const deleteRoom = require('./delete');
const getAllDetails = require('./getAllDetails');
const getAllName = require('./getAllName');
const getOneDetails = require('./getOneDetails');

/**** GET ****/

router.get('/', getAllName);

router.get('/details', getAllDetails);
router.get('/details/:name', getOneDetails);

/**** POST ****/

router.post('/create', create);

router.post('/delete', deleteRoom);

router.post('/connect/student', connectStudent);
router.post('/connect/teacher', connectTeacher);

module.exports = router;
