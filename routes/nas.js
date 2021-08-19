var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
var radius = require('../modules/radius');

router.post('/', async function (req, res) {
    var adminuser = await auth.chAuth(req, res);
    var nas = await radius.getNas();
    var resData = [];
    for (var i = 0; i < nas.length; i++) {
        resData.push({
            id: nas[i].id,
            nasname: nas[i].nasname,
            secret: nas[i].secret,
            shortName: nas[i].shortname,
            type: nas[i].type,
            port: nas[i].port,
        });
    }
    res.json({ status: 'success', message: "Data Fetched", data: resData });
    res.end();
});
module.exports = router;