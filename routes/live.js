var express = require('express');
var router = express.Router();

/* GET live listing. */
router.get('/', function(req, res, next) {
    res.render('live', { title: 'emoji-live' });
});

module.exports = router;