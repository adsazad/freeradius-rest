var databaseCon = require('../modules/database.js');
require('dotenv').config()

exports.chAuth = async function (req, res) {
    return new Promise((resolve, reject) => {
        if (!req.body.secret) {
            // send json response
            res.json({
                status: 'error',
                message: 'Authentication secret is required'
            });
            res.end();
        }
        var secret = req.body.secret;
        console.log(process.env);
        if (secret == process.env.secret) {
            resolve(true);
        } else {
            res.json({
                status: 'error',
                message: 'Username or password is incorrect'
            });
            res.end();
        }
        // db.connect(function (err) {
        //     var query = "SELECT * FROM operators WHERE username = '" + user + "' AND password = '" + password + "'";
        //     db.query(query, function (err, result) {
        //         if (err) throw err;
        //         if (result.length == 1) {
        //             resolve(result[0]);
        //         } else {
        //             res.json({
        //                 status: 'error',
        //                 message: 'Username or password is incorrect'
        //             });
        //             res.end();
        //         }
        //     });
        // });
    });
}
