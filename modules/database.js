var mysql = require('mysql');

exports.getConnect = function () {
    var con = mysql.createConnection({
        host: 'localhost',
        port: "3306",
        user: 'radiususer',
        password: 'radius',
        database: 'radiusdb'
    });
    return con;
}