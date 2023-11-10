    // Definisikan configurasi Database
    const config = require('../configs/database');
    // Gunakan library mysql
    let mysql    = require('mysql');
    // Buat koneksi
    let pool     = mysql.createPool(config);

    // Kirim error jika koneksi gagal
    pool.on('error',(err)=> {
        console.error(err);
    });

    module.exports ={
        // Fungsi untuk merender file create-data yang ada pada folder 'src/views/create-data.ejs'
        formCreateData(req, res) {
        //   res.render("create-data",{
        //     // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
        //     url : 'http://localhost:5000/',
        //     colorFlash: req.flash('color'),
        //     statusFlash: req.flash('status'),
        //     pesanFlash: req.flash('message'),
        // });
        pool.getConnection(function(err, connection) {
          if (err) throw err;
          const user_id = req.session.userid; // Ambil user_id dari sesi
          connection.query(
            `
            SELECT nisn, nama, id_kelas, nomor_telp, id_spp FROM siswa
            WHERE user_id = ?
            `
            , [user_id], // Menggunakan parameter untuk menggantikan nilai
            function(error, results) {
              if (error) throw error;
        
              // Pastikan ada hasil dan hasilnya tidak kosong
              if (results && results.length > 0 && results[0].nisn) {
                res.render("create-data", {
                  // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
                  url: 'http://localhost:5000/',
                  userName: req.session.username,
                  nisn: results[0]['nisn'],
                  nama: results[0]['nama'],
                  id_kelas: results[0]['id_kelas'],
                  nomor_telp: results[0]['nomor_telp'],
                  id_spp: results[0]['id_spp'],
                  colorFlash: req.flash('color'),
                  statusFlash: req.flash('status'),
                  pesanFlash: req.flash('message'),
                });
              } else {
                // Handle ketika data tidak ditemukan atau kosong
                res.render("create-data", {
                  url: 'http://localhost:5000/',
                  userName: req.session.username,
                  message: 'Data tidak ditemukan atau kosong.',
                });
              }
            }
          );
        });
          },    
          searchCreateData(req, res) {
            pool.getConnection(function(err, connection) {
              const searchQuery = req.query.query;
              const user_id = req.session.userid;
          
              if (err) throw err;
          
              connection.query(
                `
                SELECT nisn, nama, id_kelas, nomor_telp, id_spp FROM siswa
                WHERE nisn LIKE ?
                `,
                [user_id, `%${searchQuery}%`],
                function(error, results) {
                  if (error) throw error;
          
                  // Pastikan ada hasil dan hasilnya tidak kosong
                  if (results && results.length > 0 && results[0].nisn) {
                    res.render("create-data", {
                      url: 'http://localhost:5000/',
                      searchQuery,
                      user_id,
                      searchResults: results,
                    });
                  } else {
                    res.render("create-data", {
                      url: 'http://localhost:5000/',
                      searchQuery,
                      user_id,
                      searchResults: [],
                      message: 'Tidak ada hasil pencarian.',
                    });
                  }
                }
              );
            });
          },   
        // Fungsi untuk menyimpan data
        saveCreateData(req,res){
            // Tampung inputan user kedalam variabel nama, kelas, event, dan bukti
            const nisn = req.body.nisn;
            const nama = req.body.nama;
            const id_spp = req.body.id_spp;
            const nominal = req.body.nominal;
            const waktu = new Date();

            
            // Pastikan semua variabel terisi
            if (nisn) {
                // Panggil koneksi dan eksekusi query
                pool.getConnection(function(err, connection) {
                    if (err) {
                        console.error('Kesalahan koneksi database:', err);
                        // Tambahkan penanganan kesalahan seperti menampilkan pesan kesalahan kepada pengguna
                        req.flash('color', 'danger');
                        req.flash('status', 'Error..');
                        req.flash('message', 'Gagal menyimpan data.');
                        res.redirect('/create-data'); // Redirect kembali ke halaman create-data
                        return;
                    }
                    connection.query(
                        `INSERT INTO spp (nisn, nama, id_spp, nominal, waktu) VALUES (?, ?, ?, ?, ?);`
                    , [nisn, nama, id_spp, nominal, waktu], function (error, results) {

                        if (error) {
                            console.error('Kesalahan query database:', error);
                            // Tambahkan penanganan kesalahan seperti menampilkan pesan kesalahan kepada pengguna
                            req.flash('color', 'danger');
                            req.flash('status', 'Error..');
                            req.flash('message', 'Gagal menyimpan data.');
                            res.redirect('/create-data'); // Redirect kembali ke halaman create-data
                            return;
                        }
                        // Jika tidak ada kesalahan, set flash message untuk menampilkan pesan sukses
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Penambahan data berhasil.');
                        // Redirect ke halaman '/home' setelah 5 detik
                        setTimeout(() => {
                            res.redirect('/home');
                        }, 5000);
                    });
                    // Koneksi selesai
                    connection.release();
                });
            } else {
                // Jika ada variabel yang tidak terisi, tampilkan pesan kesalahan
                req.flash('color', 'danger');
                req.flash('status', 'Error..');
                req.flash('message', 'Harap isi semua field.');
                res.redirect('/create-data'); // Redirect kembali ke halaman create-data
            }
        }
    }