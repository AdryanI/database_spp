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
    // Fungsi untuk merender file register yang ada pada folder 'src/views/register.ejs'
    formRegister(req,res){
        res.render("register",{
            // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
            url : 'http://localhost:5000/',
        });
    },
    // Fungsi untuk menyimpan data
    saveRegister(req,res){
        // Tampung inputan user kedalam varibel username, email dan password
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.pass;
        let jabatan = req.body.jabatan;
        let periode = req.body.periode;
        // Pastikan semua varibel terisi
        if (username && email && password) {
            // Panggil koneksi dan eksekusi query
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO user (user_name,user_email,user_password,jabatan,periode) VALUES (?,?,SHA2(?,512),?,?);`
                , [username, email, password, jabatan, periode],function (error, results) {
                    if (error) throw error;
                    // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    // Kembali kehalaman login
                    res.redirect('/login');
                });
                // Koneksi selesai
                connection.release();
            })
        } else {
            // Kondisi apabila variabel username, email dan password tidak terisi
            res.redirect('/login');
            res.end();
        }
    }
}