// Definisikan router dari express
const router = require('express').Router();
const showDataController = require('../controllers').showData;
// Definisikan middleware verify.js
const verifyUser = require('../configs/verify');

// Rute 'http://localhost:5000/register/' digunakan untuk menampilkan form register
router.get('/', verifyUser.isLogin, showDataController.showData);

// Export agar dapat dibaca oleh express
module.exports = router;