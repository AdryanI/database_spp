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
          if (status === 'admin' || status === 'petugas') {
            const user = results[0];
            // Jika data ditemukan, set sesi user tersebut menjadi true
            req.session.loggedin = true;
            req.session.status = user.status; 
          }
          }
        })
      })
          res.render("create-data",{
            // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
            url : 'http://localhost:5000/',
            nama: req.session.username,
            status: req.session.status,
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
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
            const penanggung_jawab = req.body.penanggung_jawab;

            
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
                        `INSERT INTO transaksi (nisn, nama, id_spp, nominal, waktu, penanggung_jawab) VALUES (?, ?, ?, ?, ?,?);`
                    , [nisn, nama, id_spp, nominal, waktu, penanggung_jawab], function (error, results) {

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
                        res.render("create-data",{
                          // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
                          url : 'http://localhost:5000/',
                          nama: req.session.username,
                          status: req.session.status,
                          colorFlash: req.flash('color'),
                          statusFlash: req.flash('status'),
                          pesanFlash: req.flash('message'),
                      });
                        // Redirect ke halaman '/home' setelah 5 detik
                        setTimeout(() => {
                            res.redirect('/');
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
        },
    //     createDataSiswa(req, res){
    //       let id = req.session.userid;
    //       pool.getConnection(function(err, connection) {
    //       if (err) throw err;
    //   connection.query(
    //     `
    //     SELECT * FROM login where user_id = '${id}';
    //     `
    //   , function (error, results) {
    //     if (error) throw error;
    //     if (results.length > 0) {
    //       const status = results[0]['status'];
    //       if (status === 'admin' || status === 'petugas') {
    //         const user = results[0];
    //         // Jika data ditemukan, set sesi user tersebut menjadi true
    //         req.session.loggedin = true;
    //         req.session.status = user.status; 
    //       }
    //       }
    //     })
    //   })
    //       res.render("create-data-siswa",{
    //         // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
    //         url : 'http://localhost:5000/',
    //         nama: req.session.username,
    //         status: req.session.status,
    //         colorFlash: req.flash('color'),
    //         statusFlash: req.flash('status'),
    //         pesanFlash: req.flash('message'),
    //     });
    //     },
    //     saveCreateDataSiswa(req, res){
    //                   // Tampung inputan user kedalam variabel nama, kelas, event, dan bukti
    //                   const nisn = req.body.nisn;
    //                   const nama = req.body.nama;
    //                   const id_spp = req.body.id_spp;
    //                   const nominal = req.body.nominal;
    //                   const waktu = new Date();
    //                   const penanggung_jawab = req.body.penanggung_jawab;
          
                      
    //                   // Pastikan semua variabel terisi
    //                   if (nisn) {
    //                       // Panggil koneksi dan eksekusi query
    //                       pool.getConnection(function(err, connection) {
    //                           if (err) {
    //                               console.error('Kesalahan koneksi database:', err);
    //                               // Tambahkan penanganan kesalahan seperti menampilkan pesan kesalahan kepada pengguna
    //                               req.flash('color', 'danger');
    //                               req.flash('status', 'Error..');
    //                               req.flash('message', 'Gagal menyimpan data.');
    //                               res.redirect('/create-data-siswa'); // Redirect kembali ke halaman create-data
    //                               return;
    //                           }
    //                           connection.query(
    //                               `INSERT INTO transaksi (nisn, nama, id_spp, nominal, waktu, penanggung_jawab) VALUES (?, ?, ?, ?, ?,?);`
    //                           , [nisn, nama, id_spp, nominal, waktu, penanggung_jawab], function (error, results) {
          
    //                               if (error) {
    //                                   console.error('Kesalahan query database:', error);
    //                                   // Tambahkan penanganan kesalahan seperti menampilkan pesan kesalahan kepada pengguna
    //                                   req.flash('color', 'danger');
    //                                   req.flash('status', 'Error..');
    //                                   req.flash('message', 'Gagal menyimpan data.');
    //                                   res.redirect('/create-data-siswa'); // Redirect kembali ke halaman create-data
    //                                   return;
    //                               }
    //                               // Jika tidak ada kesalahan, set flash message untuk menampilkan pesan sukses
    //                               req.flash('color', 'success');
    //                               req.flash('status', 'Yes..');
    //                               req.flash('message', 'Penambahan data berhasil.');
    //                               res.render("create-data-siswa",{
    //                                 // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
    //                                 url : 'http://localhost:5000/',
    //                                 nama: req.session.username,
    //                                 status: req.session.status,
    //                                 colorFlash: req.flash('color'),
    //                                 statusFlash: req.flash('status'),
    //                                 pesanFlash: req.flash('message'),
    //                             });
    //                               // Redirect ke halaman '/home' setelah 5 detik
    //                               setTimeout(() => {
    //                                   res.redirect('/');
    //                               }, 5000);
    //                           });
    //                           // Koneksi selesai
    //                           connection.release();
    //                       });
    //                   } else {
    //                       // Jika ada variabel yang tidak terisi, tampilkan pesan kesalahan
    //                       req.flash('color', 'danger');
    //                       req.flash('status', 'Error..');
    //                       req.flash('message', 'Harap isi semua field.');
    //                       res.redirect('/create-data-siswa'); // Redirect kembali ke halaman create-data
    //                   }
    //     }
   }