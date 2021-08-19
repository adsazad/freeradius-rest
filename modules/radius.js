var dbr = require('./database');

exports.getUserCheckAttributes = function (username) {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                db.query('SELECT * FROM radcheck WHERE username = ?', [username], function (err, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        db.end();
                        resolve(rows);
                    }
                });
            }
        });
    });
}
exports.getUserGroupReplyAttributes = function (groupname) {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            }
            var q = 'SELECT * FROM radgroupreply WHERE groupname = ?';
            db.query(q, [groupname], function (err, rows) {
                if (err) {
                    reject(err);
                }
                var d = [];
                rows.map(function (row) {
                    d.push(row.attribute);
                });
                resolve(d);
            });
        });
    });
}

exports.getUserPassword = function (username) {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                db.query('SELECT * FROM radcheck WHERE username = ? AND attribute = ?', [username, "Cleartext-Password"], function (err, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        db.end();
                        if (rows.length > 0) {
                            resolve(rows[0].value);
                        }
                        resolve("");
                    }
                });
            }
        });
    });
}

exports.addUserCheckAttribute = function (username, attribute, op, value) {
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

exports.getUserGroups = function () {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(async function (err) {
            if (err) {
                reject(err);
            } else {
                var ch = await exports.getUserGroupRadCheck();
                var rp = await exports.getUserGroupRadReply();
                var groups = [];
                for (var i = 0; i < ch.length; i++) {
                    if (!groups.includes(ch[i].groupname)) {
                        groups.push(ch[i].groupname);
                    }
                }
                for (var i = 0; i < rp.length; i++) {
                    if (!groups.includes(rp[i].groupname)) {
                        groups.push(rp[i].groupname);
                    }
                }
                resolve(groups);
            }
        });
    });
}



exports.getUserGroupCheckAttributes = function (groupname) {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                var q = 'SELECT * FROM radgroupcheck WHERE groupname = ?';
                db.query(q, [groupname], function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            }
        });
    });
}
exports.getUserGroupReplyAttributes = function (groupname) {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            }
            var q = 'SELECT * FROM radgroupreply WHERE groupname = ?';
            db.query(q, [groupname], function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    });
}

exports.getUserGroupRadCheck = function () {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                var query = "SELECT * FROM radgroupcheck";
                db.query(query, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            }
        });
    });
}
exports.getUserGroupRadReply = function () {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                var query = "SELECT * FROM radgroupreply";
                db.query(query, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            }
        });
    });
}

exports.getIpPools = function () {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                var query = "SELECT * FROM radippool";
                db.query(query, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            }
        });
    });
}

exports.getNas = function () {
    return new Promise(function (resolve, reject) {
        var db = dbr.getConnect();
        db.connect(function (err) {
            if (err) {
                reject(err);
            } else {
                var query = "SELECT * FROM nas";
                db.query(query, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    console.log(rows);
                    resolve(rows);
                });
            }
        });
    });
}