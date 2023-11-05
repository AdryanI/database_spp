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
            url : 'http://localhost:5000/',
            // Kirim juga library flash yang telah di set
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req,res){
        const email = req.body.email; //ini mengambil input dari user di halaman EJS bukan mySQL!
        const password = req.body.pass; //ini mengambil input dari user di halaman EJS bukan mySQL!
        const status = req.body.stats; //ini mengambil input dari user di halaman EJS bukan mySQL!

        if (email && password && status) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM login WHERE user_email = ? AND user_password = ? AND status = ?`
                , [email, password, status],function (error, results) {
                    if (error) throw error;  
                    if (results.length > 0) {
                        const user = results[0];
                        // Jika data ditemukan, set sesi user tersebut menjadi true
                        req.session.loggedin = true;
                        req.session.userid = user.user_id;
                        req.session.username = user.user_name;
                        res.redirect('/');
                        // if (user.status === 'admin') {
                        //     res.redirect('/admin');
                        // }
                        // else if (user.status === 'petugas') {
                        //     res.redirect('/petugas');
                        // }
                        // else if (user.status === 'siswa'){
                        //     res.redirect('/siswa')
                        // }
                        // res.redirect('/');
                    } else {
                        // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                        req.flash('color', 'danger');
                        req.flash('status', 'Oops..');
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login');
                    }
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
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