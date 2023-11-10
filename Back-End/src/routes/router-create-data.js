// Definisikan router dari express
const router = require('express').Router();
const createDataController = require('../controllers').createData;
// Definisikan middleware verify.js
const verifyUser = require('../configs/verify');

// Rute 'http://localhost:5050/register/' digunakan untuk menampilkan form pengisian data
router.get('/', verifyUser.isLogin, createDataController.formCreateData);
// Rute 'http://localhost:5050/register/search' digunakan untuk mencari kesamaan nilai dari value yang diinput user
router.get('/search', verifyUser.isLogin, createDataController.searchCreateData);
// Rute 'http://localhost:5050/register/save' digunakan untuk menyimpan data yang diinput user
router.post('/save', verifyUser.isLogin, createDataController.saveCreateData);

// Export agar dapat dibaca oleh express
module.exports = router;