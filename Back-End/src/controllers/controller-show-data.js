const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    showData(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `SELECT * FROM transaksi`
            , function (error, results) {
                if(error) throw error;
                res.render("show-data", {transaksi: results},{
                    url: 'http://localhost:5000/',
                });
            });
            connection.release();
        })
    }
}