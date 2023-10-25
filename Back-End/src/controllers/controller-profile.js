const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    profile(req,res){
        let id = req.session.userid
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user where user_id = '${id}';
                `
            , function (error, results) {
                if(error) throw error;
                res.render("profile",{
                    url: 'http://localhost:5000/',
                    userName: req.session.username,
                    nama: results[0]['nama'],
                    password: results[0]['password'],
                    status: results[0]['status']
                });
            });
            connection.release();
        })
    }
}