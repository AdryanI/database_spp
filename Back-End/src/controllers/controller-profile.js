const config = require('../configs/database');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    profile(req, res) {
        let id = req.session.userid;
        let user_id = req.session.idkelas;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM login WHERE user_id = '${id}';
                `,
                function (error, results) {
                    if (error) throw error;

                    // Sekarang, tambahkan query untuk mengambil data "kompetensi_keahlian" dan "nama_kelas" dari tabel "kelas"
                    connection.query(
                        `
                        SELECT * FROM siswa WHERE user_id = '${id}';
                        `,
                        function (error, kelasResults) {
                            if (error) throw error;
                            console.log("Result: ", kelasResults);

                            // Ambil data dari tabel "profile"
                            connection.query(
                                `
                                SELECT * FROM profile;
                                `,
                                function (error, profileResults) {
                                    if (error) throw error;

                                    res.render("profile", {
                                        url: 'http://localhost:5000/',
                                        userName: req.session.username,
                                        foto: results[0]['foto'],
                                        nama: results[0]['user_name'],
                                        email: results[0]['user_email'],
                                        status: results[0]['status'],
                                        periode: results[0]['periode'],
                                        nama_kelas: kelasResults[0]['nama_kelas'], // Tambahkan data kelas
                                        kompetensi_keahlian: kelasResults[0]['kompetensi_keahlian'], // Tambahkan data kompetensi keahlian
                                    });
                                }
                            );
                        }
                    );
                }
            );
            connection.release();
        });
    },
    //  profileUpload(req, res) {

    //         pool.getConnection(function(err, connection) {
    //             if (err) throw err;
    //             connection.query(
    //                 INSERT INTO profile (foto) VALUES (?),
    //                 function (error, results) {
    //                     if (error) throw error;
    //                 }
    //             )
    //         });

    //     }
};
