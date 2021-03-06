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

router.post('/add', async function (req, res) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    con.connect(function (err) {
        if (err) {
            res.json({ status: 'error', message: "Error connecting to DB" });
        }
        var poolName = req.body.poolName;
        var framedIpAddress = req.body.framedIpAddress;
        var query = "INSERT INTO radippool (pool_name, framedipaddress,calledstationid,callingstationid,pool_key) VALUES ('" + poolName + "', '" + framedIpAddress + "','','','')";
        con.query(query, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.json({ status: 'error', message: "Error adding IP Pool" });
            } else {
                res.json({ status: 'success', message: "IP Pool Added" });
            }
            con.end();
        });
    });
});

module.exports = router;