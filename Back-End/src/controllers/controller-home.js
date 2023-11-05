const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

module.exports = {
  home(req, res) {
    let id = req.session.userid;
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT * FROM login where user_id = '${id}';
        `
      , function (error, results) {
        if (error) throw error;
        if (results.length > 0) {
          const status = results[0]['status'];
          if (status === 'admin' || status === 'petugas' || status === 'siswa') {
            const user = results[0];
            // Jika data ditemukan, set sesi user tersebut menjadi true
            req.session.loggedin = true;
            req.session.status = user.status;

            // Sekarang, kita tambahkan permintaan database untuk menghitung jumlah siswa
            connection.query(
              `
              SELECT COUNT(*) AS jumlah_siswa FROM login WHERE status = 'siswa';
              `
            , function (error, siswaResults) {
              if (error) throw error;
              if (siswaResults.length > 0) {
                const jumlah_siswa = siswaResults[0].jumlah_siswa;

                // Selanjutnya, tambahkan permintaan database untuk menghitung jumlah kelas berdasarkan jumlah ID di tabel "kelas"
                connection.query(
                  `
                  SELECT COUNT(DISTINCT id_kelas) AS jumlah_kelas FROM kelas;
                  `
                , function (error, kelasResults) {
                  if (error) throw error;
                  if (kelasResults.length > 0) {
                    const jumlah_kelas = kelasResults[0].jumlah_kelas;
                    res.render("home", {
                      url: 'http://localhost:5000/',
                      status,
                      nama: req.session.username,
                      jumlah_siswa, // Melewatkan jumlah siswa ke tampilan
                      jumlah_kelas, // Melewatkan jumlah kelas ke tampilan
                    });
                  }
                });
              }
            });
          }
        }
      });
    });
  }
}
