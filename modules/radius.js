var dbr = require('./database');

exports.addCheckAttribute = function (username, attribute, op, value) {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            var checkAttrQuery = "SELECT * FROM radcheck WHERE username = '" + username + "' AND attribute = '" + attribute + "'";
            db.query(checkAttrQuery, function (err, rows) {
                if (err) {
                    reject(err);
                } else if (rows.length > 0) {
                    var updateQuery = "UPDATE radcheck SET op = '" + op + "', value = '" + value + "' WHERE username = '" + username + "' AND attribute = '" + attribute + "'";
                    db.query(updateQuery, function (err, rows) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(rows);
                        }
                    });
                } else {
                    var insertQuery = "INSERT INTO radcheck (username, attribute, op, value) VALUES ('" + username + "', '" + attribute + "', '" + op + "', '" + value + "')";
                    db.query(insertQuery, function (err, rows) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(rows);
                        }
                    });
                }
            });
        });
    });
}
