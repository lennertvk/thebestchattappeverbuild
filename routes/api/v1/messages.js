var express = require('express');
var router = express.Router();
const saveController = require('../../../controllers/api/v1/save');
const getAllUserscontroller = require('../../../controllers/api/v1/allusers');




router.get('/get/:token', saveController.getAll);

router.get('/getbyid/:id', saveController.getOne);

router.get('/getusers', getAllUserscontroller.getAllUsers);

router.post('/save', saveController.save);

router.delete('/delete/:id',  saveController.deletebyid); 

router.put('/update/:id',  saveController.updatebyid); 
    
    
module.exports = router; 