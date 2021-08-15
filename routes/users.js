var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
var radius = require('../modules/radius');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/create", async function (req, res, next) {
  var adminuser = await auth.chAuth(req, res);
  var con = db.getConnect();
  var cusername = req.body.radusername;
  var cpassword = req.body.radpassword;
  con.connect(function (err) {
    var checkUserUser = "SELECT * FROM userinfo WHERE username = '" + cusername + "'";
    con.query(checkUserUser, function (err, result) {
      if (result.length == 0) {
        //  create freeradius user sql
        var insq = "INSERT INTO `userinfo` (`username`, `firstname`, `lastname`, `email`, `department`, `company`, `workphone`, `homephone`, `mobilephone`, `address`, `city`, `state`, `country`, `zip`, `notes`, `changeuserinfo`, `portalloginpassword`, `enableportallogin`, `creationdate`, `creationby`, `updatedate`, `updateby`) VALUES ('" + cusername + "', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0,NOW(), '" + adminuser.username + "', NOW(), '" + adminuser.username + "')";
        console.log(insq);
        con.query(insq, function (err, inresult) {
          if (err) {
            console.log(err);
            res.json({
              status: "errpr",
              message: "Error creating user: " + err
            });
            res.end();
          }
          if (inresult) {
            console.log("User created successfully");
            radius.addCheckAttribute(cusername, "Cleartext-Password", ":=", cpassword);
            res.json({
              status: "success",
              message: "User created successfully",
              additional: inresult,
            });
            res.end();
          } else {
            console.log("Error creating user");
            res.json({
              status: "error",
              message: "Error creating user"
            });
            res.end();
          }
        });
      } else {
        res.json({
          "status": "error",
          "message": "Username already exists"
        });
        res.end();
      }
    });
  });
});

module.exports = router;
