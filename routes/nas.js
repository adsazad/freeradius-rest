var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var db = require('../modules/database');
var radius = require('../modules/radius');

router.post('/index.json', async function (req, res) {
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
            ports: nas[i].ports,
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
    var nassecret = req.body.nassecret;
    var shortname = req.body.shortname;
    var type = req.body.type;
    var ports = req.body.ports;
    con.connect(function (err) {
        var sql = "INSERT INTO nas (nasname, secret, shortname, type, ports) VALUES ('" + nasname + "', '" + nassecret + "', '" + shortname + "', '" + type + "', '" + ports + "')";
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ status: 'error', message: 'Error in query' });
            } else {
                res.json({ status: 'success', message: 'Data Inserted', "data": { "freeradiusId": result.insertId } });
            }
            con.end();
        });
    });
});

// delete nas
router.post('/delete', async function (req, res) {
    var adminuser = await auth.chAuth(req, res);
    var con = db.getConnect();
    var nasname = req.body.nasname;
    con.connect(function (err) {
        // check if nas exist or not
        var sql = "SELECT * FROM nas WHERE nasname = '" + nasname + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ status: 'error', message: 'Error in query' });
            } else {
                if (result.length > 0) {
                    var sql = "DELETE FROM nas WHERE nasname = '" + nasname + "'";
                    con.query(sql, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.json({ status: 'error', message: 'Error in query' });
                        } else {
                            res.json({ status: 'success', message: 'Data Deleted' });
                        }
                        con.end();
                    });
                } else {
                    res.json({ status: 'error', message: 'Nas not found' });
                }
            }
        });
    });
});




module.exports = router;