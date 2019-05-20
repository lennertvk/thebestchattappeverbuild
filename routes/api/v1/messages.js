var express = require('express');
var mongo = require('mongodb');
var assert = require('assert');
var router = express.Router();


var url = 'mongodb://localhost:27017/Bestchatever';
// auth.js includen 
const saveController = require('../../../controllers/api/v1/save');

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.get('/messages', saveController.get)

// sing up, als er naar /signup gesurft wordt, ga dan naar authController
router.post('/save', saveController.save);
//router.post('/login', authController.login);

//router.post('/login');
//router.put('/profile');


module.exports = router; 