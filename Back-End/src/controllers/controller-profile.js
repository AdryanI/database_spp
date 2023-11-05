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
                SELECT * FROM login where user_id = '${id}';
                `
            , function (error, results) {
                if(error) throw error;
                res.render("profile",{
                    url: 'http://localhost:5000/',
                    userName: req.session.username,
                    nama: results[0]['user_name'],
                    email: results[0]['user_email'],
                    status: results[0]['status'],
                    periode: results[0]['periode'],
                    foto: results[0]['foto'],
                });
            });
            connection.release();
        })
    },
    profileUpload(req, res) {
        
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO login (foto) VALUES (?)`,
                function (error, results) {
                    if(error) throw error;
                    res.render("profileUpload", {
                        url: 'http://localhost:5000/profile/',
                        userName: req.session.username,
                    })
                }
            )
        });

    }
}