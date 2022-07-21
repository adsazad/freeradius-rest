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
router.post("/create/reply", async function (req, res, next) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    var groupName = req.body.groupName;
    var attribute = req.body.attribute;
    var value = req.body.value;
    var op = req.body.op;
    con.connect(async function (err) {
        if (err) {
            throw err;
        }
        var replyAttributes = await radius.createUserGroupReplyAttribute(groupName, attribute, op, value);
        res.json({ "status": "success", "message": "User Group Reply Attribute Created", "data": replyAttributes });
        res.end();
    });
});
router.post("/delete/reply", async function (req, res, next) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    var id = req.body.id;
    con.connect(async function (err) {
        if (err) {
            throw err;
        }
        var replyAttributes = await radius.deleteUserGroupReplyAttribute(id);
        res.json({ "status": "success", "message": "User Group Reply Attribute Deleted", "data": replyAttributes });
        res.end();
    });
});

module.exports = router;