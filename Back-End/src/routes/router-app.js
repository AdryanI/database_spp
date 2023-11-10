const router = require('express').Router();
const homeController = require('../controllers').home;
// const homeDataCont = require('../controllers').dataHome;
const adminController = require('../controllers').admin
const petugasController = require('../controllers').petugas
const siswaController = require('../controllers').siswa
const profileController = require('../controllers').profile;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home);
// router.get('/jumlah-siswa', verifyUser.isLogin, homeDataCont.home)
router.get('/admin', verifyUser.isLogin, adminController.admin);
router.get('/siswa', verifyUser.isLogin, siswaController.siswa);
router.get('/petugas', verifyUser.isLogin, petugasController.petugas);
router.get('/profile', verifyUser.isLogin, profileController.profile);
// router.post('/profileUpload', verifyUser.isLogin, profileController.profileUpload)

module.exports = router;