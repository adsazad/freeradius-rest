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

// create nas
router.post('/create', async function (req, res) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    var nasname = req.body.nasname;
    var secret = req.body.secret;
    var shortname = req.body.shortname;
    var type = req.body.type;
    var ports = req.body.ports;
    con.connect(function (err) {
        var sql = "INSERT INTO nas (nasname, secret, shortname, type, ports) VALUES ('" + nasname + "', '" + secret + "', '" + shortname + "', '" + type + "', '" + ports + "')";
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ status: 'error', message: 'Error in query' });
            } else {
                res.json({ status: 'success', message: 'Data Inserted' });
            }
            con.end();
        });
    });
});


module.exports = router;