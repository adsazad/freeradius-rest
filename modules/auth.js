var databaseCon = require('../modules/database.js');

exports.chAuth = function (req,res) {
    if(!req.body.authUsername) {
        // send json response
        res.json({
            status: 'error',
            message: 'Username is required'
        });
        res.end();
    }
    if(!req.body.authPassword) {
        // send json response
        res.json({
            status: 'error',
            message: 'Password is required'
        });
        res.end();

    }
    var user = req.body.authUsername;
    var password = req.body.authPassword;
    var db = databaseCon.getConnect();
    db.connect(function (err) {
        var query = "SELECT * FROM operators WHERE username = '" + user + "' AND password = '" + password+"'";
        db.query(query, function (err, result) {
            if (err) throw err;
            console.log(result.length);
            if(result.length == 1) {
                return result[0];
            }else{
                res.json({
                    status: 'error',
                    message: 'Username or password is incorrect'
                });
                res.end();
            }
        });
    });
}
