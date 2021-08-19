var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
var radius = require('../modules/radius');

router.post('/', async function (req, res) {
    var adminuser = await auth.chAuth(req, res);
    var ippools = await radius.getIpPools();
    var resData = [];
    for (var i = 0; i < ippools.length; i++) {
        var pool = ippools[i];
        resData.push({
            id: pool.id,
            name: pool.name,
            poolName: pool.pool_name,
            framedIpAddress: pool.framedipaddress,
        });
    }
    res.json({ status: 'success', message: "Data Fetched", data: resData });
    res.end();
});

module.exports = router;