const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

module.exports = {
    home(req,res){
        let id = req.session.userid
            pool.getConnection(function(err, connection) {
                if (err) throw err;
            connection.query(
                `
                SELECT * FROM login where user_id = '${id}';
                `
            ,function (error, results) {
                    if (error) throw error;  
                    if (results.length > 0) {
            const status = results[0]['status']
                       if (status === 'admin' || status === 'petugas' || status === 'siswa') {
                        const user = results[0];
                        // Jika data ditemukan, set sesi user tersebut menjadi true
                        req.session.loggedin = true;
                        req.session.status = user.status;
                        res.render("home",{
                            url: 'http://localhost:5000/',
                            status,
                            nama: req.session.username,
                        });
                    }
                    }
                });
            });
}};