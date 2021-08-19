var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
var radius = require('../modules/radius');

router.post("/", async function (req, res, next) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    con.connect(async function (err) {
        if (err) {
            throw err;
        }
        var usergroup = await radius.getUserGroups();
        console.log(usergroup);
        res.json({ "status": "success", "message": "User group created", "additional": usergroup });
    });
    // res.json({});
});

module.exports = router;