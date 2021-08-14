var mysql = require('mysql');

exports.getConnect = function () {
    var con = mysql.createConnection({
        host: '10.0.0.125',
        port: "3306",
        user: 'arash',
        password: 'arash',
        database: 'radius'
    });
    return con;
}