var express = require('express');
var router = express.Router();
var usersRouter = require('./users');


/* GET home page. */
router.get('/', function(req, res, next) {
  var auth = require('../modules/auth');
  auth.chAuth("administrator","radius");
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);


module.exports = router;
