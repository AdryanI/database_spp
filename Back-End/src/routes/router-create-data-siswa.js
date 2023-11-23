    // Definisikan router dari express
    const router = require('express').Router();
    const createDataController = require('../controllers').createDataSiswa;
    // Definisikan middleware verify.js
    const verifyUser = require('../configs/verify');

    // Rute 'http://localhost:5050/create-data-siswa/' digunakan untuk menampilkan form pengisian data siswa
    router.get('/data-login', verifyUser.isLogin, createDataController.createDataSiswaLogin);
    router.get('/data-spp', verifyUser.isLogin, createDataController.createDataSiswaSpp);
    router.get('/data-siswa', verifyUser.isLogin, createDataController.createDataSiswa);

    // Rute 'http://localhost:5050/create-data-siswa/save-login-data' digunakan untuk menyimpan data yang diinput admin
    router.post('/save-login-data', verifyUser.isLogin, createDataController.saveCreateDataSiswaLogin);
    router.post('/save-spp-data', verifyUser.isLogin, createDataController.saveCreateDataSiswaSpp);
    router.post('/save-siswa-data', verifyUser.isLogin, createDataController.saveCreateDataSiswa);
    // Export agar dapat dibaca oleh express
    module.exports = router;