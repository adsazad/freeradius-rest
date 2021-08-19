var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var userGroupRouter = require('./usergroup');
var ippools = require('./ippools');

/* GET home page. */
router.get('/', function(req, res, next) {
  var auth = require('../modules/auth');
  auth.chAuth("administrator","radius");
  res.render('index', { title: 'Express' });
});



router.use('/user', usersRouter);
router.use('/usergroup', userGroupRouter);
router.use('/ippools', ippools);



module.exports = router;
