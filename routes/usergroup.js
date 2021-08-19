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
        res.json({ "status": "success", "message": "User group created", "data": usergroup });
    });
    // res.json({});
});
router.post("/attributes", async function (req, res, next) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    var usergroup = req.body.usergroup;
    if (usergroup == "" || usergroup == null) {
        res.json({ "status": "error", "message": "User group paramater not found" });
        res.end();
    } else {
        con.connect(async function (err) {
            if (err) {
                throw err;
            }
            var chattr = await radius.getUserGroupCheckAttributes(usergroup);
            var rpattr = await radius.getUserGroupReplyAttributes(usergroup);
            var resGroups = {};
            resGroups["checkAttributes"] = chattr;
            resGroups["replyAttributes"] = rpattr;
            res.json({ "status": "success", "message": "User group created", "data": resGroups });
            res.end();
        });
    }
});

module.exports = router;