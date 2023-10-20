const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    saveDataToDatabase: (nama, kelas, event, waktu, callback) => {
        if (nama && kelas && event) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error('Kesalahan koneksi database:', err);
                    callback('Gagal menyimpan data.');
                } else {
                    connection.query(
                        `INSERT INTO transaksi (nama, kelas, nama_event, created_at) VALUES (?, ?, ?, ?);`,
                        [nama, kelas, event, waktu],
                        function (error, results) {
                            if (error) {
                                console.error('Kesalahan query database:', error);
                                callback('Gagal menyimpan data.');
                            } else {
                                callback(null, 'Penambahan data berhasil.');
                            }
                            connection.release();
                        }
                    );
                }
            });
        } else {
            callback('Harap isi semua field.');
        }
    },
};
