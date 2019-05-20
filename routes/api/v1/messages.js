var express = require('express');
var router = express.Router();
const saveController = require('../../../controllers/api/v1/save');
const getAllUserscontroller = require('../../../controllers/api/v1/allusers');




router.get('/get', saveController.getAll);
router.get('/getusers', getAllUserscontroller.getAllUsers);

router.post('/save', saveController.save);


module.exports = router; 