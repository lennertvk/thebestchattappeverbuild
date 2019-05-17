var express = require('express');
var router = express.Router();
// auth.js includen 
const authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// sing up, als er naar /signup gesurft wordt, ga dan naar authController
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/profile', authController.update);



module.exports = router;
