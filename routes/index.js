var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var userGroupRouter = require('./usergroup');


/* GET home page. */
router.get('/', function(req, res, next) {
  var auth = require('../modules/auth');
  auth.chAuth("administrator","radius");
  res.render('index', { title: 'Express' });
});



router.use('/user', usersRouter);
router.use('/usergroup', userGroupRouter);


module.exports = router;
