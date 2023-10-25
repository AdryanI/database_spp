const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
    login(req,res){
        res.render("login",{
            url : 'http://localhost:1242/',
            // Kirim juga library flash yang telah di set
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req, res) {
        let nama = req.body.nama;
        let password = req.body.password;
        let status = req.body.status;
        if (nama && password && status) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM login WHERE nama = ? AND password = ? AND status = ?`,
                    [nama, password, status],
                    function (error, results) {
                        if (error) {
                            console.log(err);
                        }
                        if (results.length > 0) {
                            // Jika data ditemukan, set sesi user tersebut menjadi true
                            req.session.loggedin = true;
                            req.session.nama = results[0].nama;
                            req.session.password = results[0].password;
                            req.session.status = results[0].status;
    
                            // Tambahkan pengecekan status di sini
                            if (nama && password && status.toLowerCase() === 'admin') {
                                // Redirect ke halaman Admin jika status adalah Admin
                                res.redirect('/admin');
                            } else if (nama && password && status.toLowerCase() === 'petugas') {
                                // Redirect ke halaman Petugas jika status adalah Petugas
                                res.redirect('/petugas');
                            } else if (nama && password && status.toLowerCase() === 'siswa') {
                                // Redirect ke halaman User jika status adalah Siswa
                                res.redirect('/siswa');
                            } else {
                                // Jika status tidak dikenali, Anda dapat menangani sesuai kebutuhan Anda
                                // Contoh: Redirect ke halaman lain atau menampilkan pesan kesalahan
                                res.redirect('/login');
                            }
                        } else {
                            // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Akun tidak ditemukan');
                            res.redirect('/admin');
                        }
                    });
                connection.release();
            });
        } else {
            res.redirect('/home');
            res.end();
        }
    },    
    // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'http://localhost:5050/login/logout'
    logout(req,res){
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}