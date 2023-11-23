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

 // Fungsi untuk menangani kesalahan basis data
function handleDatabaseError(error, req, res) {
    console.error('Kesalahan database:', error);
    req.flash('color', 'danger');
    req.flash('status', 'Error..');
    req.flash('message', 'Gagal menyimpan data.');
    res.redirect('/create-data-siswa');
}

module.exports = {
    createDataSiswaLogin(req, res) {
        let id = req.session.userid;

        pool.getConnection(function (err, connection) {
            if (err) {
                handleDatabaseError(err, res);
                return;
            }

            connection.query(
                `SELECT * FROM login where user_id = '${id}';`,
                function (error, results) {
                    if (error) {
                        handleDatabaseError(error, res);
                        return;
                    }

                    if (results.length > 0) {
                        const status = results[0]['status'];
                        if (status === 'admin') {
                            const user = results[0];
                            req.session.loggedin = true;
                            req.session.status = user.status;
                        }
                    }
                });

            connection.release();
        });

        res.render("create-data-login", {
            url : 'http://localhost:5000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    createDataSiswaSpp(req, res) {
        let id = req.session.userid;

        pool.getConnection(function (err, connection) {
            if (err) {
                handleDatabaseError(err, res);
                return;
            }

            connection.query(
                `SELECT * FROM login where user_id = '${id}';`,
                function (error, results) {
                    if (error) {
                        handleDatabaseError(error, res);
                        return;
                    }

                    if (results.length > 0) {
                        const status = results[0]['status'];
                        if (status === 'admin') {
                            const user = results[0];
                            req.session.loggedin = true;
                            req.session.status = user.status;
                        }
                    }
                });

            connection.release();
        });

        res.render("create-data-spp", {
            url : 'http://localhost:5000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    createDataSiswa(req, res) {
        let id = req.session.userid;

        pool.getConnection(function (err, connection) {
            if (err) {
                handleDatabaseError(err, res);
                return;
            }

            connection.query(
                `SELECT * FROM login where user_id = '${id}';`,
                function (error, results) {
                    if (error) {
                        handleDatabaseError(error, res);
                        return;
                    }

                    if (results.length > 0) {
                        const status = results[0]['status'];
                        if (status === 'admin') {
                            const user = results[0];
                            req.session.loggedin = true;
                            req.session.status = user.status;
                        }
                    }
                });

            connection.release();
        });

        res.render("create-data-siswa", {
            url : 'http://localhost:5000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },

    saveCreateDataSiswaLogin(req, res) {
        const user_name = req.body.user_name;
        const user_email = req.body.user_email;
        const user_password = req.body.user_password;
        // const alamat = req.body.alamat;
        // const nomor_telp = req.body.nomor_telp;
        const status = req.body.status;
        const periode = req.body.periode;
        // const nama = req.body.nama;
        // const kompetensi_keahlian = req.body.kompetensi_keahlian;
        // const nama_kelas = req.body.nama_kelas;
        // const id_kelas = req.body.id_kelas;
        // const id_spp = req.body.id_spp;

            pool.getConnection(function (err, connection) {
                if (err) {
                    handleDatabaseError(err, res);
                    return;
                }

                connection.beginTransaction(function (err) {
                    if (err) {
                        handleDatabaseError(err, res);
                        return;
                    }
                
                    connection.query(
                        `INSERT INTO login (user_name, user_email, user_password, status, periode) VALUES (?, ?, ?, ?, ?);`,
                        [user_name, user_email, user_password, status, periode],
                        function (error, results) {
                            if (error) {
                                return connection.rollback(function () {
                                    handleDatabaseError(error, res);
                                });
                            }
                
                            // Commit transaksi jika berhasil
                            connection.commit(function (err) {
                                if (err) {
                                    return connection.rollback(function () {
                                        handleDatabaseError(err, res);
                                    });
                                }
                                // Jika berhasil, redirect atau kirim respons sesuai kebutuhan
                                res.redirect('/create-data-siswa/data-spp'); // Ganti '/success-page' dengan halaman yang sesuai
                            });
                        }
                    );
                });
            })
        // } else {
        //     req.flash('color', 'danger');
        //     req.flash('status', 'Error..');
        //     req.flash('message', 'Harap isi semua field.');
        //     res.redirect('/create-data-siswa');
        // }
    },
    saveCreateDataSiswaSpp(req, res) {
        const id_spp = req.body.id_spp;
        const nama = req.body.nama;
        const user_email = req.body.user_email

        pool.getConnection(function (err, connection) {
            if (err) {
                handleDatabaseError(err, res);
                return;
            }

            connection.beginTransaction(function (err) {
                if (err) {
                    handleDatabaseError(err, res);
                    return;
                }

                connection.query(
                    `INSERT INTO spp (id_spp, nama, user_email) VALUES (?, ?, ?);`,
                    [id_spp, nama, user_email],
                    function (error, results) {
                        if (error) {
                            return connection.rollback(function () {
                                handleDatabaseError(error, res);
                            });
                        }

                        // Commit transaksi jika berhasil
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    handleDatabaseError(err, res);
                                });
                            }
                            // Jika berhasil, redirect atau kirim respons sesuai kebutuhan
                            res.redirect('/create-data-siswa/data-siswa'); // Ganti '/success-page' dengan halaman yang sesuai
                        });
                    }
                );
            });
        });
    },

    saveCreateDataSiswa(req, res) {
        // Mendapatkan data yang diperlukan dari req.body
        const nisn = req.body.nisn;
        const nis = req.body.nis;
        const nama = req.body.nama;
        // const user_id = req.body.user_id;
        const id_kelas = req.body.id_kelas;
        const nama_kelas = req.body.nama_kelas;
        const kompetensi_keahlian = req.body.kompetensi_keahlian;
        const alamat = req.body.alamat
        const nomor_telp = req.body.nomor_telp;
        const id_spp = req.body.id_spp;

        // Mendapatkan koneksi dari pool
        pool.getConnection(function (err, connection) {
            if (err) {
                handleDatabaseError(err, res);
                return;
            }

            connection.beginTransaction(function (err) {
                if (err) {
                    handleDatabaseError(err, res);
                    return;
                }

                // Eksekusi query untuk menyimpan data siswa
                connection.query(
                    `
                    INSERT INTO siswa (nisn, nis, nama, id_kelas, nama_kelas, kompetensi_keahlian, alamat, nomor_telp, id_spp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                    `,
                    [nisn, nis, nama, id_kelas, nama_kelas, kompetensi_keahlian, alamat, nomor_telp, id_spp],
                    function (error, results) {
                        if (error) {
                            return connection.rollback(function () {
                                handleDatabaseError(error, res);
                            });
                        }

                        // Commit transaksi jika berhasil
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    handleDatabaseError(err, res);
                                });
                            }
                            // Jika berhasil, redirect atau kirim respons sesuai kebutuhan
                            res.redirect('/'); // Ganti '/success-page' dengan halaman yang sesuai
                        });
                    }
                );
            });
        });
    }
};
