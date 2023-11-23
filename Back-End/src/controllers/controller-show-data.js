const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    showData(req, res) {
        let id = req.session.userid;
        pool.getConnection(function(err, connection) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            connection.query(`SELECT * FROM transaksi;`, function (errorTransaksi, resultsTransaksi) {
                if (errorTransaksi) {
                    console.error(errorTransaksi);
                    res.status(500).send('Internal Server Error');
                    return;
                }
            
                connection.query(
                    `SELECT status FROM login WHERE user_id = '${id}';`, 
                    function (errorLogin, resultsLogin) {
                        if (errorLogin) {
                            console.error(errorLogin);
                            res.status(500).send('Internal Server error');
                            return;
                        }
                        
                        if (resultsLogin.length > 0) {
                            console.log(resultsLogin);
                            const status = resultsLogin[0]['status'];
                            if (status === 'admin' || status === 'petugas' || status === 'siswa'){
                                const user = resultsLogin[0];
                                // Jika data ditemukan, set sesi user tersebut menjadi true
                                req.session.loggedin = true;
                                req.session.status = user.status;
                            }

                            const nisn = resultsTransaksi[0]['nisn']; // Ganti dengan variabel yang sesuai dari resultsTransaksi
                            const nama = resultsTransaksi[0]['nama']; // Ganti dengan variabel yang sesuai dari resultsTransaksi
                            const id_spp = resultsTransaksi[0]['id_spp']; // Ganti dengan variabel yang sesuai dari resultsTransaksi
                            const nominal = resultsTransaksi[0]['nominal']; // Ganti dengan variabel yang sesuai dari resultsTransaksi
                            const waktu = resultsTransaksi[0]['waktu']; // Ganti dengan variabel yang sesuai dari resultsTransaksi
                            const penanggung_jawab = resultsTransaksi[0]['penanggung_jawab']; // Ganti dengan variabel yang sesuai dari resultsTransaksi
            
                            req.session.loggedin = true;
            
                            res.render("show-data", {
                                transaksi: resultsTransaksi,
                                url: 'http://localhost:5000/',
                                status,
                                nisn,
                                nama,
                                id_spp,
                                nominal,
                                waktu,
                                penanggung_jawab,
                            });
                        } else {
                            res.render("show-data", {
                                transaksi: [],
                                url: 'http://localhost:5000/',
                            });
                        }
            
                        connection.release();
                    }
                );
            });
            
        });
    }
}
