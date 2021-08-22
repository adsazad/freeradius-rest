var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
var radius = require('../modules/radius');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  var adminuser = await auth.chAuth(req, res);
  var con = db.getConnect();
  con.connect(function (err) {
    if (err) {
      throw err;
    }
    con.query('SELECT * FROM userinfo', async function (err, rows) {
      if (err) {
        throw err;
      }
      var resData = [];
      await Promise.all(rows.map(async function (row) {
        var checkAttr = await radius.getUserCheckAttributes(row.username);
        var password = await radius.getUserPassword(row.username);
        var d = {
          id: row.id,
          username: row.username,
          password: password,
          checkAttr: JSON.parse(JSON.stringify(checkAttr)),
        };
        resData.push(d);
      }));
      res.json(resData);
    });
  });
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
            radius.addUserCheckAttribute(cusername, "Cleartext-Password", ":=", cpassword);
            res.json({
              status: "success",
              message: "User created successfully",
              data: inresult,
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

// Change password from username
router.post("/changepassword", async function (req, res, next) {
  var adminuser = await auth.chAuth(req, res);
  var con = db.getConnect();
  var cusername = req.body.radusername;
  var cpassword = req.body.radnewpassword;
  con.connect(function (err) {
    var checkUserUser = "SELECT * FROM userinfo WHERE username = '" + cusername + "'";
    con.query(checkUserUser, async function (err, result) {
      if (result.length == 0) {
        res.json({
          "status": "error",
          "message": "Username does not exist"
        });
        res.end();
      } else {
        var edres = await radius.editUserCheckAttribute(cusername, "Cleartext-Password", ":=", cpassword);
        if (edres == "Attribute not found") {
          res.json({
            "status": "error",
            "message": "Attribute not found"
          });
        } else if (edres == "User not found") {
          res.json({
            "status": "error",
            "message": "User not found"
          });
        } else {
          res.json({
            "status": "success",
            "message": "Password changed successfully"
          });
          res.end();
        }
      }
    });
  });
});

module.exports = router;
