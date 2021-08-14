var databaseCon = require('../modules/database.js');

exports.chAuth = function (user, password) {
    console.log("here");
    var db = databaseCon.getConnect();
    db.connect(function(err){
        var query = "SELECT * FROM operators";
        db.query(query, function (err, result) {
            if (err) throw err;
            console.log(result);
          });
    });
}
