var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/create",function(req,res,next){
  var user = auth.chAuth(req,res);
  
  

  res.send("create user");
});

module.exports = router;
