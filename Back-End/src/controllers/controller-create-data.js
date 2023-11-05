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
        formCreateData(req,res){
            res.render("create-data",{
                // Definisikan semua variabel yang ingin ikut dirender ke dalam create-data.ejs
                url : 'http://localhost:5000/',
            });
        },
        // Fungsi untuk menyimpan data
        saveCreateData(req,res){
            // Tampung inputan user kedalam variabel nama, kelas, event, dan bukti
            const nama = req.body.user_name;
            const email = req.body.user_email;
            const perihal = req.body.perihal;
            const waktu = new Date();

            
            // Pastikan semua variabel terisi
            if (nama && email && perihal) {
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
                        `INSERT INTO spp (nama, email, perihal, waktu) VALUES (?, ?, ?, ?);`
                    , [nama, email, perihal, waktu], function (error, results) {

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